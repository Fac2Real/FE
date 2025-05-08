import { useEffect, useState } from "react";
import MonitorBox from "../components/MonitorBox";
import useWebSocket from "../websocket/useWebSocket";
// import mockZoneList from "../mock_data/mock_zonelist";

// 메모...
// 이거 화면 이동했다가 돌아오면 어떻게 되는 거지?
// level이 DB에 들어가나요?

export default function Monitoring() {
  const [zoneList, setZoneList] = useState([]);

  // 메시지 예: {"zoneId":"PID-790","sensorType":"humid","level":2}
  useWebSocket("/topic/zone", (data) => {
    setZoneList((prev) =>
      prev.map((zone) =>
        zone.zoneId === data.zoneId
          ? {
              ...zone,
              level: data.level,
              abnormal_sensor: data.sensorType,
            }
          : zone
      )
    );
  });
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
      zoneId: "PID-791",
      title: "테스트룸A",
      master: "정00",
      // level: 0,
      // abnormal_sensor: null,
    },
    {
      zoneId: "PID-792",
      title: "테스트룸A",
      master: "정00",
      // level: 0,
      // abnormal_sensor: null,
    },
    {
      zoneId: "PID-003",
      title: "테스트룸A",
      master: "정00",
      // level: 0,
      // abnormal_sensor: null,
    },
  ];

  useEffect(() => {
    setZoneList(
      mock_zoneList.map((z) => ({
        ...z,
        level: 0,
        abnormal_sensor: null,
      })) // mock data의 주석처리한 부분을 여기서 붙여줌
    );
  }, []);

  // console.log(zoneList); // 확인 완료 ~ !
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
