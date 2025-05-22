import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import WorkerTable from "../components/WorkerTable";
import axiosInstance from "../api/axiosInstance";
import RefreshIcon from "../assets/refresh_icon.svg?react";
import LogTable from "../components/LogTable";
import WorkerInfoModal from "../components/modal/WorkerInfoModal";

function ManagerSetting({ manager, workerList, modalParam }) {
  const [mode, setMode] = useState("");
  const [cand, setCand] = useState([]);
  const fetchCand = () => {
    axiosInstance
      .get(``)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("매니저 후보 조회에 실패했습니다.", e);
        console.log("현재 위치 작업자 mock data를 대신 불러옵니다.");
        setCand(mock_workers);
      });
  };

  return (
    <>
      {/* 매니저 존재 여부에 따라 매니저 정보 표 보여줌 */}
      {manager && (
        <>
          <div className="button-flex manager-button">
            <button
              onClick={() => {
                setMode("edit");
                fetchCand();
              }}
            >
              수정
            </button>
          </div>
          <WorkerTable
            worker_list={[manager]}
            selectWorker={modalParam.selectedWorker}
            openModal={modalParam.openModal}
            isManager={true}
          />
        </>
      )}
      {!manager && (
        <>
          <div
            className="button-flex manager-button"
            style={{ justifyContent: "space-between" }}
          >
            <p>매니저가 할당되지 않았습니다</p>
            <button
              onClick={() => {
                setMode("add");
                fetchCand();
              }}
            >
              등록
            </button>
          </div>
        </>
      )}
      {/* 모드에 따라 추가하는 부분 보여주기 */}
      {mode && (
        <>
          <div className="edit-manager">
            <div className="select-flex">
              <p>담당자 선택</p>
              <select></select>
              <select></select>
              {!manager && mode == "add" && (
                <button className="no-flex-button">등록</button>
              )}
              {manager && mode == "edit" && (
                <button className="no-flex-button">변경</button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function ZoneDetail_2() {
  const { zoneId } = useParams();
  const bottomRef = useRef(null);

  const [refreshLog, setRefreshLog] = useState(0);
  const [logs, setLogs] = useState([]);

  const [refreshWorkers, setRefreshWorkers] = useState(0);
  const [workerList, setWorkerList] = useState([]);

  // Mock data 시작
  const mock_workers = [
    {
      name: "S00",
      status: "위험",
      wearableId: "WEARABLE000111000",
      email: "test@example.com",
      phone: "01022222222",
    },
    {
      name: "Y00",
      status: "정상",
      wearableId: "인식되지 않음",
      email: "test@example.com",
      phone: "01033333333",
    },
    {
      name: "J00",
      status: "정상",
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
      dangerLevel: 1,
      value: 35.5,
      timestamp: "2024-03-20T14:30:00",
      abnormalType: "온도 위험",
      targetId: "sensor456",
    },
    {
      zoneId: "zone123",
      targetType: "환경",
      sensorType: "TEMPERATURE",
      dangerLevel: 0,
      value: 35.5,
      timestamp: "2024-03-20T14:30:00",
      abnormalType: "온도 안정",
      targetId: "sensor456",
    },
  ];

  const mock_manager = {
    wearableId: "WKR20250521001",
    name: "홍길동",
    phone: "010-1234-5678",
    email: "honggildong@example.com",
    zoneId: "ZONE001",
    zone: "포장 구역 A",
    status: "정상",
  };

  // const mock_manager = null;
  // mock data 끝

  // 공간의 작업자 정보 받아오기
  const fetchWorkers = () => {
    axiosInstance
      .get(`/api/workers/zone/${zoneId}`)
      .then((res) => {
        // console.log(`${zoneId}의 작업자 정보 get!`);
        // console.log(res.data);
        setWorkerList(res.data);
      })
      .catch((e) => {
        console.log(`${zoneId}의 작업자 로드 실패 - mock data를 불러옵니다`, e);
        setWorkerList(mock_workers);
      });
  };

  useEffect(() => {
    fetchWorkers();
    const interval = setInterval(() => {
      fetchWorkers();
    }, 60000); // 1분!
    return () => clearInterval(interval);
  }, [refreshWorkers]);

  // 로그 정보 받아오기
  const currentPage = useRef();
  useEffect(() => {
    if (refreshLog) {
      axiosInstance
        .get(`/api/system-logs/zone/${zoneId}`, {
          params: {
            page: 0,
            size: 10,
          },
        })
        .then((res) => {
          // console.log(res.data.content);
          currentPage.current = 0;
          setLogs(res.data.content);
        })
        .catch((e) => {
          console.log("로그 조회 실패 - mock-data를 불러옵니다", e);
          setLogs(mock_loglist);
        });
    }
  }, [refreshLog]);

  const [manager, setManager] = useState();

  // 매니저 정보 받아오기
  useEffect(() => {
    axiosInstance
      .get(``)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("매니저 정보 조회에 실패했습니다.", e);
        console.log("mock data를 불러옵니다.");
        setManager(mock_manager);
      });
  }, []);

  // Kibana 대시보드 ID (미리 저장해둔 고정된 dashboard)
  const dashboardId = "d9cad7d0-2d48-11f0-b003-9ddfbb58f11c";
  const sensorTypes = ["temp", "humid"]; // 원하는 센서 타입들 추가

  const mock_details_sensor = {
    zoneId: zoneId,
    zoneName: "생산 라인 A",
    sensors: [
      { type: "temp", id: "SID-XXX" },
      { type: "humid", id: "SID-YYY" },
    ],
  };

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

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setSelectedWorker();
    setIsOpen(false);
  };
  const [selectedWorkerInfo, setSelectedWorker] = useState();
  return (
    <>
      <WorkerInfoModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        workerInfo={selectedWorkerInfo}
      />
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
        <div className="top-box">
          근무자 현황
          <span
            className="refresh"
            onClick={() => setRefreshWorkers((prev) => prev + 1)}
          >
            <RefreshIcon width="1.2rem" fill="#000" />
          </span>
        </div>
        <div className="bottom-box">
          <WorkerTable
            worker_list={workerList}
            isDetail={true}
            selectWorker={setSelectedWorker}
            openModal={setIsOpen}
          />
        </div>
      </div>
      {/* 담당자 :: 스프린트2 */}
      <div className="box-wrapper">
        <div className="top-box">담당자 정보</div>
        <div className="bottom-box">
          <ManagerSetting
            manager={manager}
            workerList={workerList}
            modalParam={{
              selectedWorker: setSelectedWorker,
              openModal: setIsOpen,
            }}
          />
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
