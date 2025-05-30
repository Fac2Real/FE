import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import WorkerTable from "../components/WorkerTable";
import WorkerInfoModal from "../components/modal/WorkerInfoModal";
import RegisterWorker from "../components/RegisterWorker";
import SafetyCallModal from "../components/modal/SafetyCallModal";
import { mock_workers } from "../mock_data/mock_workers";

export default function Safety() {
  const [workerList, setWorkerList] = useState([]);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedWorkerInfo, setSelectedWorker] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setSelectedWorker();
    setIsOpen(false);
  };

  const fetchWorkers = useCallback(() => {
    axiosInstance
      .get("/api/workers")
      .then((res) => {
        setWorkerList(res.data.data);
      })
      .catch((e) => {
        console.log("작업자 정보 조회 실패 - mock data를 불러옵니다", e);
        setWorkerList(mock_workers);
      });
  });

  // 1분에 한 번씩 작업자 정보를 리프레시해준다.
  useEffect(() => {
    fetchWorkers();
    const interval = setInterval(() => {
      fetchWorkers();
    }, 60000); // 1분!
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <WorkerInfoModal
        isOpen={isOpen}
        onClose={onClose}
        workerInfo={selectedWorkerInfo}
      />
      <h1>작업자 관리</h1>
      <div className="safety-body">
        <WorkerTable
          worker_list={workerList}
          selectWorker={setSelectedWorker}
          openModal={setIsOpen}
          callbackModal={(worker) => {
            setSelectedWorker(worker);
            setIsCallModalOpen(true);
          }}
        />
      </div>
      <SafetyCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        workerList={workerList}
      />
      <div
        className="safety-body"
        style={{
          height: "auto",
          width: "80%",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <RegisterWorker fetchWorkers={fetchWorkers} />
      </div>
    </>
  );
}
