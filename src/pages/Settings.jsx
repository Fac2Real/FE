import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ZoneInfoBox from "../components/ZoneInfoBox";
import axios from "axios";
/* ────────────────────────────────
   1. 센서 타입 → 한글 명/분류 매핑
──────────────────────────────── */
const ENV_TYPES = ["temp", "humid"]; // 환경센서
const FAC_TYPES = [ "dust", "current", "vibration"]; // 설비센서

const toKoName = (type) => {
  switch (type) {
    case "temp":      return "온도 센서";
    case "humid":     return "습도 센서";
    case "dust":      return "먼지 센서";
    case "current":   return "전류 센서";
    case "vibration": return "진동 센서";
    default:          return type;
  }
};

export default function Settings() {
  /* mock data */
  const initialZoneList = [
    {
      title: "보일러실",
      env_sensor: [
        { name: "온도 센서", thres: 60 },
        { name: "습도 센서", thres: 75 },
      ],
      fac_sensor: [],
      master: "김00",
    },
    {
      title: "휴게실",
      env_sensor: [],
      fac_sensor: ["진동 센서"],
      master: "윤00",
    },
    { title: "테스트룸A", env_sensor: [], fac_sensor: [], master: "정00" },
  ];

  const [sensorInfo, setSensorInfo] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [zoneList, setZoneList] = useState([]);

  useEffect(() => {
    // axios
    //   .get("/api/zones")
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));

    // axios.get(`http://localhost:8080/api/zones`)        // ← GET /api/zones
    // .then((res) => {
    //   const list = res.data.map((z) => ({
    //     id: z.zoneId,           // ← key 용
    //     title: z.zoneName,      // ← 화면에 찍힐 이름
    //     // get 요청에서 데이터가 없으면 빈 배열 혹은 "" 할당해주기
    //     env_sensor: z.env_sensor || [],
    //     fac_sensor: z.fac_sensor || [],
    //     master: z.master || "",
    //   }));
    //   setZoneList(list);
    // })
    // .catch((e) => console.error(e));
    // // db에 존 데이터가 없을 경우 초기 예시 데이터 보여줌
    // if (zoneList.length === 0) {
    //   setZoneList(initialZoneList);
    // }

    /* ────────────────────────────────
       2. ① 공간 + ② 센서를 한 번에 받아서 매핑
    ───────────────────────────────── */
    Promise.all([
      axios.get("http://localhost:8080/api/zones"),
      axios.get("http://localhost:8080/api/sensors")   // ← location 컬럼 포함
    ])
      .then(([zoneRes, sensorRes]) => {
        const sensors = sensorRes.data;

        /* 센서를 zoneId 기준으로 그룹핑 → { 5: {env:[], fac:[]}, … } */
        const mapByZone = sensors.reduce((acc, s) => {
          const zoneId = s.location?.trim();   // ← 공백 대비
          if (!zoneId) return acc;
        
          if (!acc[zoneId]) acc[zoneId] = { env: [], fac: [] };
        
          const koName = toKoName(s.sensorType);        // ※ 백엔드 키 sensorType
          //const item   = { name: koName, thres: s.threshold ?? "-" };
          const item = {                      // ← 센서 공통 구조
            id:   s.sensorId,                // 새 필드
            name: toKoName(s.sensorType),
            thres: s.threshold ?? "-"
          };
        
          if (ENV_TYPES.includes(s.sensorType)) {
            acc[zoneId].env.push(item);                 // env → 객체 그대로
          } else if (FAC_TYPES.includes(s.sensorType)) {
            acc[zoneId].fac.push(item);               // fac → 문자열만 push
          }
          return acc;
        }, {});

        /* zones 에 센서 배열을 끼워 넣어 최종 zoneList 작성 */
        const list = zoneRes.data.map((z) => ({
          id: z.zoneId.trim(),
          title: z.zoneName,
          env_sensor: mapByZone[z.zoneId]?.env || [],
          fac_sensor: mapByZone[z.zoneId]?.fac || [],
          master: z.master || "",
        }));

       /* 레코드가 하나도 없으면 예시 데이터 사용 */
        setZoneList(list.length ? list : initialZoneList);
      })
      .catch(console.error);
  }, []);

  const handleOpenModal = (zoneName, sensorName, thres) => {
    setSensorInfo({ zoneName, sensorName, thres });
    setModalOpen(true);
  };

  const handleThresUpdate = (newValue) => {
    const value = Number(newValue);
    const li = zoneList.map((zone) => {
      if (zone.title !== sensorInfo.zoneName) return zone;
      return {
        ...zone,
        env_sensor: zone.env_sensor.map((sen) => {
          if (sen.name !== sensorInfo.sensorName) return sen;
          return { ...sen, thres: value };
        }),
      };
    });
    console.log(li);
    setZoneList(li);
    setModalOpen(false);
  };

  const handleAddZone = async (newZone) => {
    const confirmed = window.confirm(`[${newZone}]을 추가하시겠습니까?`);
    if (!confirmed) return;
    else{
      try {
        /* 1) 백엔드에 공간 생성 요청 */
        const { data } = await axios.post(
          "http://localhost:8080/api/zones",
          { zoneName: newZone } // 요청하는 zoneName이 title이 됨
        );
    
        /* 2) 전체 요소를를 화면에 출력하기위한 데이터터 */
        const newItem = {
          id: data.zoneId,        // key 로도 사용
          title: data.zoneName,   // UI 에 표시할 이름
          env_sensor: [],
          fac_sensor: [],
          master: "",
        };
    
        /* 3) 화면 상태 업데이트 */
        setZoneList((prev) => [...prev, newItem]);
    
        /* 4) 로그 (센서 API와 동일한 패턴) */
        console.log(
          `ZONE 생성: ${data.zoneId} / ${data.zoneName}`
        );
      } catch (err) {
        console.error(err);
        alert("공간 생성에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        sensorInfo={sensorInfo}
        onUpdate={handleThresUpdate}
      />
      <h1>센서 관리</h1>
      {zoneList.map((z, i) => (
        <ZoneInfoBox zone={z} key={z.title} modalBtn={handleOpenModal} />
      ))}
      <ZoneInfoBox zone="공간 추가" onAddZone={handleAddZone} />
    </>
  );
}
