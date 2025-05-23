import { useEffect, useState, useCallback } from "react";
import MonitorBox from "../components/MonitorBox";
import useWebSocket from "../websocket/useWebSocket";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

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

  useEffect(() => {
    axiosInstance
      .get("/api/zones")
      .then((res) => {
        const stored = localStorage.getItem("zoneLevels");
        const zoneLevels = stored ? JSON.parse(stored) : {};
        const updated = res.data.map((z) => {
          const savedLevel = zoneLevels[z.zoneId];
          if (savedLevel !== undefined) {
            return { ...z, level: savedLevel };
          } else {
            return z;
          }
        });
        setZoneList(updated);
        console.log(updated);
        // setZoneList(res.data);
        // console.log(res.data);
      })
      .catch((e) => console.log("실시간 모니터링 페이지 : 로딩 실패", e));
  }, []);

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
                state={{ zoneName: z.zoneName }}
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
