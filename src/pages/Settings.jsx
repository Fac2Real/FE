import { useEffect, useState } from "react";
import SensorModal from "../components/SensorModal";
import ZoneInfoBox from "../components/ZoneInfoBox";
import axios from "axios";
import FacilityModal from "../components/FacilityModal";
/* ────────────────────────────────
   1. 센서 타입 → 한글 명/분류 매핑
──────────────────────────────── */
const ENV_TYPES = ["temp", "humid"]; // 환경센서
const FAC_TYPES = ["dust", "current", "vibration"]; // 설비센서

const toKoName = (type) => {
  switch (type) {
    case "temp":
      return "온도 센서";
    case "humid":
      return "습도 센서";
    case "dust":
      return "먼지 센서";
    case "current":
      return "전류 센서";
    case "vibration":
      return "진동 센서";
    default:
      return type;
  }
};

export default function Settings() {
  const [sensorInfo, setSensorInfo] = useState(); // 모달 전달용
  const [selectedZone, setSelectedZone] = useState(); // 모달 전달용
  const [isSensorModalOpen, setSensorModalOpen] = useState(false); // 모달 열기
  const [isFacilityModalOpen, setFacilityModalOpen] = useState(false); // 모달 열기
  const [zoneList, setZoneList] = useState([]); // 존 추가하고 열기

  // mock-data 시작 -->
  const initialZoneList = [
    {
      title: "보일러실",
      env_sensor: [
        { name: "온도 센서", thres: 60, sensorId: "TEMP001" },
        { name: "습도 센서", thres: 75, sensorId: "HUMID001" },
      ],
      facility: [
        {
          name: "설비A",
          fac_sensor: [
            { name: "진동 센서", id: "UA10T-VIB-24060890" },
            { name: "온도 센서", id: "UA10T-TEM-24060890" },
          ],
        },
      ],
      master: "김00",
    },
    {
      title: "휴게실",
      env_sensor: [],
      facility: [
        {
          name: "설비B",
          fac_sensor: [
            { name: "진동 센서", id: "UA10T-VIB-24060891" },
            { name: "온도 센서", id: "UA10T-TEM-24060891" },
          ],
        },
      ],
      master: "윤00",
    },
    { title: "테스트룸A", env_sensor: [], facility: [], master: "정00" },
    {
      title: "테스트룸B",
      env_sensor: [],
      facility: [{ name: "설비A" }],
      master: "윤00",
    },
  ];

  // useEffect(() => {
  //   if (zoneList.length === 0) {
  //     setZoneList(initialZoneList);
  //   }
  // }, []);

  // <---- mock-data 끝

  /* ────────────────────────────────
       2. ① 공간 + ② 센서를 한 번에 받아서 매핑
    ───────────────────────────────── */
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/api/zones"),
      axios.get("http://localhost:8080/api/sensors"), // ← location 컬럼 포함
    ])
      .then(([zoneRes, sensorRes]) => {
        console.log(zoneRes.data);
        console.log(sensorRes.data);
        const sensors = sensorRes.data;

        /* 센서를 zoneId 기준으로 그룹핑 → { 5: {env:[], fac:[]}, … } */
        const mapByZone = sensors.reduce((acc, s) => {
          const zoneId = s.location?.trim(); // ← 공백 대비
          if (!zoneId) return acc;

          if (!acc[zoneId]) acc[zoneId] = { env: [], fac: [] };

          const koName = toKoName(s.sensorType); // ※ 백엔드 키 sensorType
          const item = {
            // ← 센서 공통 구조
            id: s.sensorId, // 새 필드
            name: toKoName(s.sensorType),
            thres: s.threshold ?? "-",
          };

          if (ENV_TYPES.includes(s.sensorType)) {
            acc[zoneId].env.push(item); // env → 객체 그대로
          } else if (FAC_TYPES.includes(s.sensorType)) {
            acc[zoneId].fac.push(item); // fac → 문자열만 push
          }
          return acc;
        }, {});

        /* zones 에 센서 배열을 끼워 넣어 최종 zoneList 작성 */
        const list = zoneRes.data.map((z) => {
          const zoneId = z.zoneId.trim();
          const mapped = mapByZone[zoneId] || { env: [], fac: [] };
          return {
            title: z.zoneName,
            env_sensor: mapped.env.map((s) => ({
              name: s.name,
              thres: s.thres,
              sensorId: s.id,
            })),
            facility:
              mapped.fac.length > 0
                ? [
                    {
                      name: "API필요",
                      fac_sensor: mapped.fac.map((s) => ({
                        name: s.name,
                        id: s.id,
                      })),
                    },
                  ]
                : [],
            master: z.master || "",
          };
        });
        console.log("????");
        console.log(list);

        /* 레코드가 하나도 없으면 예시 데이터 사용 */
        setZoneList(list.length ? list : initialZoneList);
      })
      .catch(console.error);
  }, []);

  /* 모달 여는 동작 전용 함수 */
  const handleOpenSensorModal = (zoneName, sensorName, thres) => {
    setSensorInfo({ zoneName, sensorName, thres });
    setSensorModalOpen(true);
  };

  const handleOpenFacilityModal = (zoneName) => {
    setSelectedZone(zoneName);
    setFacilityModalOpen(true);
  };

  const handleThresUpdate = (newValue) => {
    /* TODO :: 임계값 업데이트하기 */
    /* 화면 표현하기 (완료) */
    const value = Number(newValue);
    const updated = zoneList.map((zone) => {
      if (zone.title !== sensorInfo.zoneName) return zone;
      return {
        ...zone,
        env_sensor: zone.env_sensor.map((sen) => {
          if (sen.name !== sensorInfo.sensorName) return sen;
          return { ...sen, thres: value };
        }),
      };
    });
    console.log(updated);
    setZoneList(updated);
    setSensorModalOpen(false);
  };

  const handleFacilityUpdate = (newValue) => {
    console.log(`공간명: ${selectedZone} 설비명: ${newValue}`);
    /* TODO :: 설비 목록 업데이트하기 */
    /* 화면 표현하기 */
    const updated = zoneList.map((z) => {
      if (z.title !== selectedZone) return z;
      return {
        ...z,
        facility: [
          ...(z.facility || []),
          {
            name: newValue,
            fac_sensor: [],
          },
        ],
      };
    });
    setZoneList(updated);
    setFacilityModalOpen(false);
  };

  const handleAddZone = async (newZone) => {
    const confirmed = window.confirm(`[${newZone}]을 추가하시겠습니까?`);
    if (!confirmed) return;
    else {
      try {
        // const { data } = await axios.post("http://localhost:8080/api/zones", {
        //   zoneName: newZone,
        // });

        // const newItem = {
        //   id: data.zoneId,
        //   title: data.zoneName,
        //   env_sensor: [],
        //   fac_sensor: [],
        //   master: "",
        // };

        const newItem = {
          title: newZone,
          env_sensor: [],
          facility: [],
          master: "",
        };

        setZoneList((prev) => [...prev, newItem]);
        // console.log(`ZONE 생성: ${data.zoneId} / ${data.zoneName}`);
      } catch (err) {
        console.error(err);
        alert("공간 생성에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <SensorModal
        isOpen={isSensorModalOpen}
        onClose={() => setSensorModalOpen(false)}
        sensorInfo={sensorInfo}
        onUpdate={handleThresUpdate}
      />
      <FacilityModal
        isOpen={isFacilityModalOpen}
        onClose={() => setFacilityModalOpen(false)}
        zoneInfo={selectedZone}
        onUpdate={handleFacilityUpdate}
      />
      <h1>센서 관리</h1>
      {zoneList.map((z, i) => (
        <ZoneInfoBox
          zone={z}
          key={z.title}
          sensorModalBtn={handleOpenSensorModal}
          facilityModalBtn={handleOpenFacilityModal}
        />
      ))}
      <ZoneInfoBox zone="공간 추가" onAddZone={handleAddZone} />
    </>
  );
}
