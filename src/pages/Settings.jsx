import { useEffect, useRef, useState } from "react";
import SensorModal from "../components/SensorModal";
import ZoneInfoBox from "../components/ZoneInfoBox";
import axiosInstance from "../api/axiosInstance";
import FacilityModal from "../components/FacilityModal";
import EditModal from "../components/EditModal";
import FacEditModal from "../components/FacEditModal";
/* ────────────────────────────────
   1. 센서 타입 → 한글 명/분류 매핑
──────────────────────────────── */

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
  const [selectedFac, setSelectedFac] = useState();
  const [selectedFacId, setSelectedFacId] = useState();
  const [isSensorModalOpen, setSensorModalOpen] = useState(false); // 모달 열기
  const [isFacilityModalOpen, setFacilityModalOpen] = useState(false); // 모달 열기
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isFacEditModalOpen, setFacEditOpen] = useState(false);
  const [zoneList, setZoneList] = useState([]); // 존 추가하고 열기

  /* ────────────────────────────────
       2. ① 공간 + ② 센서를 한 번에 받아서 매핑
    ───────────────────────────────── */
  useEffect(() => {
    Promise.all([
      axiosInstance.get("/api/zones/zoneitems"), // zoneItems 1개만 써도 OK
    ])
      .then(([res]) => {
        console.log(res.data);
        const list = res.data.map((z) => ({
          title: z.title,
          env_sensor: z.env_sensor.map((s) => ({
            name: toKoName(s.sensorType), // 한글 변환
            thres: s.sensorThres,
            margin: s.allowVal, // JSON 내용 확인해서 변경해야댐..
            sensorId: s.sensorId,
          })),
          facility: z.facility.map((f) => ({
            name: f.name,
            id: f.id,
            fac_sensor: f.fac_sensor.map((s) => ({
              name: toKoName(s.sensorType),
              id: s.sensorId,
            })),
          })),
        }));

        setZoneList(list.length ? list : initialZoneList);
      })
      .catch(console.error);
  }, []);

  /* 모달 여는 동작 전용 함수 */
  const handleOpenSensorModal = (zoneName, sensorId, thres, margin) => {
    setSensorInfo({ zoneName, sensorId, thres, margin });
    setSensorModalOpen(true);
  };

  const handleOpenFacilityModal = (zoneName) => {
    setSelectedZone(zoneName);
    setFacilityModalOpen(true);
  };

  const handleOpenZoneEditModal = (zoneName) => {
    setSelectedZone(zoneName);
    setEditModalOpen(true);
  };

  const handleOpenFacEditModal = (facName, equipId) => {
    console.log(facName, equipId);
    setSelectedFac(facName);
    setSelectedFacId(equipId);
    setFacEditOpen(true);
  };

  const handleThresUpdate = (newThres, newMargin) => {
    /* TODO :: 임계값 업데이트하기 */
    axiosInstance
      .post(`/api/sensors/${sensorInfo.sensorId}`, {
        sensorThres: newThres,
        allowVal: newMargin,
      })
      .then((res) => {
        console.log(sensorInfo.sensorId);
        console.log("임계값 업데이트 완료", res);
        /* 화면 표현하기 (완료) => 이후 then으로 옮기기 */
        const updated = zoneList.map((zone) => {
          if (zone.title !== sensorInfo.zoneName) {
            return zone;
          }
          return {
            ...zone,
            env_sensor: zone.env_sensor.map((sen) => {
              if (sen.sensorId !== sensorInfo.sensorId) {
                return sen;
              }
              return { ...sen, thres: newThres, margin: newMargin };
            }),
          };
        });
        setZoneList(updated);
      })
      .catch((e) => console.log("임계값 업데이트 실패", e));
    setSensorModalOpen(false);
  };

  const handleFacilityUpdate = (newValue) => {
    axiosInstance
      .post("/api/equips", {
        zoneName: selectedZone,
        equipName: newValue,
      })
      .then(() => {
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
      })
      .catch((e) => console.log(e));
    setFacilityModalOpen(false);
  };

  const handleEditZone = (newZoneName) => {
    axiosInstance
      .post(`/api/zones/${selectedZone}`, {
        zoneName: newZoneName,
      })
      .then(() => {
        const updated = zoneList.map((z) => {
          if (z.title !== selectedZone) return z;
          return {
            ...z,
            title: newZoneName,
          };
        });
        setZoneList(updated);
        alert(`${selectedZone}이 ${newZoneName}로 변경되었습니다`); // 없애도 되려나..
        setSelectedZone(newZoneName);
      })
      .catch((e) => alert("이름 변경에 실패하였습니다"));
    setEditModalOpen(false);
  };

  const handleEditFac = (newFacName, equipId) => {
    axiosInstance
      .post(`/api/equips/${equipId}`, {
        equipName: newFacName,
      })
      .then((res) => {
        const updated = zoneList.map((z) => {
          return {
            ...z,
            facility: z.facility.map((fac) => {
              if (fac.id !== equipId) return fac;

              return {
                ...fac,
                name: newFacName,
              };
            }),
          };
        });

        setZoneList(updated);
      })
      .catch((e) => console.log(e));

    setFacEditOpen(false);
  };

  const handleAddZone = async (newZone) => {
    const confirmed = window.confirm(`[${newZone}]을 추가하시겠습니까?`);
    if (!confirmed) return;
    else {
      axiosInstance
        .post("/api/zones", {
          zoneName: newZone,
        })
        .then((res) => {
          console.log(res);
          const newItem = {
            title: newZone,
            env_sensor: [],
            facility: [],
            // master: "",
          };

          setZoneList((prev) => [...prev, newItem]);
        })
        .catch((e) => {
          alert("공간 생성에 실패하였습니다.", e);
        });
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
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        zoneName={selectedZone}
        onUpdate={handleEditZone}
      />
      <FacEditModal
        isOpen={isFacEditModalOpen}
        onClose={() => setFacEditOpen(false)}
        facName={selectedFac}
        equipId={selectedFacId}
        onUpdate={handleEditFac}
      />
      <h1>센서 관리</h1>
      {zoneList.map((z, i) => (
        <ZoneInfoBox
          zone={z}
          key={z.title}
          sensorModalBtn={handleOpenSensorModal}
          facilityModalBtn={handleOpenFacilityModal}
          zoneEditModalBtn={handleOpenZoneEditModal}
          facEditModalBtn={handleOpenFacEditModal}
        />
      ))}
      <ZoneInfoBox zone="공간 추가" onAddZone={handleAddZone} />
    </>
  );
}
