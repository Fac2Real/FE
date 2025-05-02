import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ZoneInfoBox from "../components/ZoneInfoBox";

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
    if (zoneList.length === 0) {
      setZoneList(initialZoneList);
    }
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
      <ZoneInfoBox zone="공간 추가" />
    </>
  );
}
