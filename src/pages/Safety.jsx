import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import WorkerTable from "../components/WorkerTable";
import WorkerInfoModal from "../components/modal/WorkerInfoModal";

export default function Safety() {
  const [workerList, setWorkerList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setSelectedWorker();
    setIsOpen(false);
  };
  const [selectedWorkerInfo, setSelectedWorker] = useState();

  const mock_workers = [
    {
      name: "김00",
      // role: "사원",
      status: "위험",
      zone: "포장 구역 A",
      wearableId: "WEARABLE000111000",
      email: "test1@example.com",
      phone: "010111111111",
    },
    {
      name: "윤00",
      // role: "공장장",
      status: "정상",
      zone: "휴게실",
      wearableId: "인식되지 않음",
      email: "test2@example.com",
      phone: "010222222222",
    },
    {
      name: "정00",
      // role: "반장",
      status: "정상",
      zone: "조립 구역 B",
      wearableId: "WEARABLE111111111",
      email: "test3@example.com",
      phone: "01033333333",
    },
  ];

  const fetchWorkers = useCallback(() => {
    axiosInstance
      .get("/api/workers")
      .then(() => {
        console.log("작업자 정보 get!");
      })
      .catch((e) => {
        console.log("작업자 정보 조회 실패 - mock data를 불러옵니다", e);
        setWorkerList(mock_workers);
      });
  });

  useEffect(() => {
    fetchWorkers();
    const interval = setInterval(() => {
      fetchWorkers();
    }, 60000); // 1분!
    return () => clearInterval(interval);
  }, []);

  console.log("rerendering");
  return (
    <>
      <WorkerInfoModal
        isOpen={isOpen}
        onClose={onClose}
        workerInfo={selectedWorkerInfo}
      />
      <h1>작업자 안전관리</h1>
      <div className="safety-body">
        <WorkerTable
          worker_list={workerList}
          selectWorker={setSelectedWorker}
          openModal={setIsOpen}
        />
      </div>
    </>
  );
}
