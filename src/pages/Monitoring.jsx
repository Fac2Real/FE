import { useEffect, useState } from "react";
import MonitorBox from "../components/MonitorBox";
import mockZoneList from "../mock_data/mock_zonelist";

export default function Monitoring() {
  const [zoneList, setZoneList] = useState([]);
  //   useEffect(() => {
  //     fetch("../mock_data/mock_zonelist.json")
  //       .then((res) => {
  //         setZoneList(res.data);
  //       })
  //       .catch((err) => {
  //         console.error("데이터 불러오기 실패", err);
  //       });
  //   }, []);
  useEffect(() => {
    setZoneList(mockZoneList);
  });
  return (
    <>
      <h1>Monitoring</h1>
      <div className="monitor-body">
        <div>
          {zoneList.map((z, i) => (
            <MonitorBox zone={z} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
