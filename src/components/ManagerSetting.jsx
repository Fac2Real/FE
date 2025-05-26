import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { mock_workers, mock_manager } from "../mock_data/mock_workers";
import WorkerTable from "./WorkerTable";
export default function ManagerSetting({ modalParam, zoneId }) {
  const [mode, setMode] = useState("");
  const [cand, setCand] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [manager, setManager] = useState();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 매니저 정보 받아오기
  useEffect(() => {
    console.log("???");
    axiosInstance
      .get(`/api/zone-managers/${zoneId}`)
      .then((res) => {
        setManager(res.data.data);
      })
      .catch((e) => {
        console.log("매니저 정보 조회에 실패했습니다.", e);
        console.log("mock data를 불러옵니다.");
        setManager(mock_manager);
      });
  }, [refreshTrigger]);

  const fetchCand = () => {
    axiosInstance
      .get(`/api/zone-managers/candidates/${zoneId}`)
      .then((res) => {
        setCand(res.data.data);
      })
      .catch((e) => {
        console.log("매니저 후보 조회에 실패했습니다.", e);
        console.log("현재 위치 작업자 mock data를 대신 불러옵니다.");
        setCand(mock_workers);
      });
  };

  const handleSubmit = () => {
    axiosInstance
      .post(`/api/zone-managers/${zoneId}/assign/${selectedWorkerId}`)
      .then((res) => {
        setMode("");
        setRefreshTrigger((prev) => prev + 1);
      })
      .catch((e) => console.log("담당자 지정 실패", e));
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
              style={{ marginRight: 0 }}
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
              <select
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                value={selectedWorkerId}
              >
                {cand.map((c, i) => {
                  return (
                    <option key={i} value={c.workerId}>
                      {c.name} ({c.workerId})
                    </option>
                  );
                })}
              </select>
              {(mode == "edit" || mode == "add") && (
                <button className="no-flex-button" onClick={handleSubmit}>
                  {mode == "edit" ? "변경" : "등록"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
