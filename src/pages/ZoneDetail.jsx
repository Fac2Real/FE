import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import RefreshIcon from "../assets/refresh_icon.svg?react";
import LogTable from "../components/LogTable";
import WorkerInfoModal from "../components/modal/WorkerInfoModal";
import WorkerTable from "../components/WorkerTable";
import ManagerSetting from "../components/ManagerSetting";
import { mock_loglist, mock_workers } from "../mock_data/mock_workers";
import Equip from "../components/Equip";

export default function ZoneDetail() {
  const { zoneId } = useParams();
  const { state } = useLocation();
  const zoneName = state?.zoneName;

  // 1) 모든 useState/useRef
  const [dashboards, setDashboards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  const [refreshLog, setRefreshLog] = useState(0);
  const [logs, setLogs] = useState([]);
  const [refreshWorkers, setRefreshWorkers] = useState(0);
  const [workerList, setWorkerList] = useState([]);
  const [selectedWorkerInfo, setSelectedWorker] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setSelectedWorker();
    setIsOpen(false);
  };

  // 2) 모든 useEffect (조건 없이 항상 선언)
  useEffect(() => {
    setLoading(true);
    const url =
      import.meta.env.VITE_BACKEND_URL +
      `/api/grafana-zone/${zoneId}/dashboards`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setDashboards(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [zoneId]);

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

  // 공간의 작업자 정보 받아오기
  const fetchWorkers = () => {
    axiosInstance
      .get(`/api/workers/zone/${zoneId}`)
      .then((res) => {
        console.log(res.data.data);
        setWorkerList(res.data.data);
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

  // 3) 조건부 렌더링
  // if (loading) return <div>로딩 중…</div>;
  // if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <WorkerInfoModal
        isOpen={isOpen}
        onClose={onClose}
        workerInfo={selectedWorkerInfo}
      />
      <h1>{zoneName}</h1>
      {/* 환경 리포트 부분 :: Grafana by InfluxDB */}
      <div className="box-wrapper">
        <div className="top-box">환경 리포트</div>
        <div className="bottom-box">
          {loading && <div>로딩 중…</div>}
          {error && <div>에러 발생: {error}</div>}
          {!loading && !error && (
            <div className="grafana-wrapper">
              {dashboards &&
                dashboards.map(({ sensorId, sensorType, iframeUrl }) => (
                  <div key={sensorId} className="grafana-box">
                    <p>
                      {sensorType} 센서 ({sensorId})
                    </p>
                    <div>
                      <iframe
                        src={iframeUrl}
                        title={`grafana-${sensorId}`}
                        style={{ width: "100%", height: "100%", border: 0 }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
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
            workerList={workerList}
            zoneId={zoneId}
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
          <Equip />
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
          <LogTable logs={logs} currentPage={currentPage.current} />
        </div>
      </div>
      <div ref={bottomRef} style={{ height: 0 }}></div>
    </>
  );
}
