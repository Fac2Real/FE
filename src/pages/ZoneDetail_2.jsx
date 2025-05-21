import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import WorkerTable from "../components/WorkerTable";
import axiosInstance from "../api/axiosInstance";
import RefreshIcon from "../assets/refresh_icon.svg?react";
import LogTable from "../components/LogTable";

export default function ZoneDetail_2() {
  const { zoneId } = useParams();
  const [isLogOpen, setLogOpen] = useState(false);
  const bottomRef = useRef(null);

  const [refreshLog, setRefreshLog] = useState(0);
  const [logs, setLogs] = useState([]);

  // 작업자 정보
  const mock_workers = [
    {
      name: "S00",
      role: "사원",
      status: "위험",
      // zone: "포장 구역 A",
      wearableId: "WEARABLE000111000",
      email: "test@example.com",
      phone: "01011112222",
    },
    {
      name: "Y00",
      role: "공장장",
      status: "정상",
      // zone: "휴게실",
      wearableId: "인식되지 않음",
      email: "test@example.com",
      phone: "01011112222",
    },
    {
      name: "J00",
      role: "반장",
      status: "정상",
      // zone: "조립 구역 B",
      wearableId: "WEARABLE111111111",
      email: "test@example.com",
      phone: "01011112222",
    },
  ];

  const mock_loglist = [
    {
      zoneId: "zone123",
      targetType: "환경",
      sensorType: "TEMPERATURE",
      dangerLevel: 2,
      value: 35.5,
      timestamp: "2024-03-20T14:30:00",
      abnormalType: "온도 위험",
      targetId: "sensor456",
    },
    {
      zoneId: "zone123",
      targetType: "환경",
      sensorType: "TEMPERATURE",
      dangerLevel: 2,
      value: 35.5,
      timestamp: "2024-03-20T14:30:00",
      abnormalType: "온도 위험",
      targetId: "sensor456",
    },
    {
      zoneId: "zone123",
      targetType: "환경",
      sensorType: "TEMPERATURE",
      dangerLevel: 2,
      value: 35.5,
      timestamp: "2024-03-20T14:30:00",
      abnormalType: "온도 위험",
      targetId: "sensor456",
    },
  ];

  // 공간의 작업자 정보 받아오기
  useEffect(() => {
    axiosInstance
      .get(`/api/workers/${zoneId}`)
      .then(() => {
        console.log(`${zoneId}의 작업자 정보 get!`);
      })
      .catch((e) => console.log(`${zoneId}의 작업자 로드 실패`, e));
  }, []); // 여기서 리프레시 버튼을 추가해도 좋을 것 같네요!

  // 로그 상세조회
  useEffect(() => {
    axiosInstance
      .get(`/api/system-logs/zone/${zoneId}`)
      .then((res) => {
        // console.log(res.data);
        // setLogs();
      })
      .catch((e) => {
        console.log("로그 조회 실패 - mock-data를 불러옵니다", e);
        setLogs(mock_loglist);
      });
  }, [refreshLog]);

  // Kibana 대시보드 ID (미리 저장해둔 고정된 dashboard)
  const dashboardId = "d9cad7d0-2d48-11f0-b003-9ddfbb58f11c";
  const sensorTypes = ["temp", "humid"]; // 원하는 센서 타입들 추가

  /* mock data */
  /* zoneId로 detail 정보를 요청하면, 아래 정보를 줬으면 좋겠다...*/

  const mock_details_sensor = {
    zoneId: zoneId,
    zoneName: "생산 라인 A",
    sensors: [
      { type: "temp", id: "SID-XXX" },
      { type: "humid", id: "SID-YYY" },
    ],
  };
  console.log(mock_details_sensor.zoneId);

  const mapSensorType = (sensorType) => {
    const sensorMap = { temp: "온도 센서", humid: "습도 센서" };
    return sensorMap[sensorType];
  };
  const buildKibanaUrl = (sensorType) =>
    `http://localhost:5601/app/dashboards#/view/${dashboardId}?embed=true&_g=(
      filters:!(
        (query:(match_phrase:(zoneId.keyword:"${zoneId}"))),
        (query:(match_phrase:(sensorType.keyword:${sensorType})))
      ),
      refreshInterval:(pause:!f,value:5000),
      time:(from:now-10m,to:now)
    )`.replace(/\s+/g, "");

  // 로그 펴질 때 화면 부드럽게 펼쳐지기
  useEffect(() => {
    if (logs.length !== 0 && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 200);
    }
  }, [logs.length]);
  return (
    <>
      <h1>{mock_details_sensor.zoneName}</h1>
      {/* 환경 리포트 부분 :: ELK */}
      <div className="box-wrapper">
        <div className="top-box">환경 리포트</div>
        <div className="bottom-box">
          <div className="elk-wrapper">
            {mock_details_sensor.sensors?.map((sensor) => (
              <div key={sensor.id} className="elk-box">
                <p>
                  {mapSensorType(sensor.type)} ({sensor.id})
                </p>
                <div>
                  {/* <iframe
                    src={buildKibanaUrl(sensor.type)}
                    title={`Dashboard for ${zoneId} - ${sensor.type}`}
                  /> */}
                  {zoneId && (
                    <iframe
                      src={buildKibanaUrl(sensor.type)}
                      title={`Dashboard for ${zoneId} - ${sensor.type}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 근무자 현황 :: 스프린트2 */}
      <div className="box-wrapper">
        <div className="top-box">근무자 현황</div>
        <div className="bottom-box">
          <WorkerTable worker_list={mock_workers} isDetail={true} />
        </div>
      </div>
      {/* 담당자 :: 스프린트2 */}
      <div className="box-wrapper">
        <div className="top-box">담당자 정보</div>
        <div className="bottom-box">
          <p>스프린트2에서 진행 예정</p>
        </div>
      </div>
      {/* 설비 현황 :: 스프린트3 */}
      <div className="box-wrapper">
        <div className="top-box">설비 현황</div>
        <div className="bottom-box">
          <p>스프린트3에서 진행 예정</p>
        </div>
      </div>
      {/* 시스템 로그 조회 :: 토글해야 호출! */}
      <div className="box-wrapper">
        <div className="top-box">
          시스템 로그 조회
          <span
            className="refresh"
            onClick={() => setRefreshLog((prev) => prev + 1)}
          >
            <RefreshIcon width="1.2rem" fill="#000" />
          </span>
        </div>
        <div
          className={`bottom-box last-box ${
            logs.length == 0 ? "closed" : "open"
          }`}
        >
          <LogTable logs={logs} />
        </div>
      </div>
      <div ref={bottomRef} style={{ height: 0 }}></div>
    </>
  );
}
