import { useEffect, useState, useCallback } from "react";
import MonitorBox from "../components/MonitorBox";
import useWebSocket from "../websocket/useWebSocket";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
// import mockZoneList from "../mock_data/mock_zonelist";

// 메모...
// 이거 화면 이동했다가 돌아오면 어떻게 되는 거지?
// level이 DB에 들어가나요?

export default function Monitoring() {
  const [zoneList, setZoneList] = useState([]);

  // 렌더링 될때마다 불필요한 websocket 연결을 피하기 위해 useCallback 사용
  const handleWebSocketMessage = useCallback((data) => {
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
  }, []);
  // 메시지 예: {"zoneId":"PID-790","sensorType":"humid","level":2}
  useWebSocket("/topic/zone", handleWebSocketMessage);
  // 필요한 데이터가.. 무엇일까.....
  // 1. 공간명 : 화면에 뿌려주기
  // 2. 공간아이디: 웹소켓에서 준 거랑 매핑해주기!
  // 3. 담당자 정보??

  useEffect(() => {
    axiosInstance
      .get("/api/zones")
      .then((res) => setZoneList(res.data))
      .catch((e) => console.log("실시간 모니터링 페이지 : 로딩 실패", e));
  }, []);

  // useEffect(() => {
  //   setZoneList(
  //     mock_zoneList.map((z) => ({
  //       ...z,
  //       level: 1,
  //       abnormal_sensor: "온도",
  //     })) // mock data의 주석처리한 부분을 여기서 붙여줌
  //   );
  // }, []);

  // console.log(zoneList); // 확인 완료 ~ !
  return (
    <>
      <h1>Monitoring</h1>
      <div className="monitor-body">
        <div>
          {zoneList.length !== 0 &&
            zoneList.map((z, i) => (
              <Link
                key={i}
                to={`/zone/${z.zoneId}`}
                className="link-as-contents"
              >
                <MonitorBox zone={z} />
              </Link>
            ))}
          {zoneList.length === 0 && (
            <Link to="/settings">
              센서 관리 페이지에서 새 공간을 등록하세요(click)
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
