import { useEffect, useState } from "react";
import MonitorBox from "../components/MonitorBox";
// import mockZoneList from "../mock_data/mock_zonelist";

export default function Monitoring() {
  const [zoneList, setZoneList] = useState([]);

  // 필요한 데이터가.. 무엇일까.....
  // 1. 공간명 : 화면에 뿌려주기
  // 2. 공간아이디: 웹소켓에서 준 거랑 매핑해주기!
  // 3. 담당자 정보??

  //   useEffect(() => {
  //     fetch("../mock_data/mock_zonelist.json")
  //       .then((res) => {
  //         setZoneList(res.data);
  //       })
  //       .catch((err) => {
  //         console.error("데이터 불러오기 실패", err);
  //       });
  //   }, []);

  const mock_zoneList = [
    {
      title: "테스트룸A",
      master: "정00",
      level: 0,
      abnormal_sensor: null,
    },
    {
      title: "테스트룸A",
      master: "정00",
      level: 0,
      abnormal_sensor: null,
    },
    {
      title: "테스트룸A",
      master: "정00",
      level: 0,
      abnormal_sensor: null,
    },
  ];

  useEffect(() => {
    // setZoneList(mockZoneList);
    setZoneList(mock_zoneList);
  }, []);
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
