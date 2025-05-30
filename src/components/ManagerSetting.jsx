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
      .get(`/api/workers/zone/${zoneId}/manager`)
      .then((res) => {
        console.log(res.data.data);
        setManager(res.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          console.log("해당 공간에 담당자가 없습니다.");
          setManager(null); // 혹은 빈 상태 처리
        } else {
          console.log("매니저 정보 조회에 실패했습니다.", error);
          // console.log("mock data를 불러옵니다.");
          // setManager(mock_manager);
        }
      });
  }, [refreshTrigger]);

  // 매니저 후보자 목록을 불러오고, 첫 번째 후보자를 선택
  useEffect(() => {
    if (cand.length > 0) {
      setSelectedWorkerId(cand[0].workerId); // cand 배열의 첫 번째 workerId를 초기값으로 설정
    }
  }, [cand]);

  const fetchCand = () => {
    axiosInstance
      .get(`/api/zone-managers/candidates/${zoneId}`)
      .then((res) => {
        setCand(res.data.data);
      })
      .catch((e) => {
        console.log("매니저 후보 조회에 실패했습니다.", e);
        // console.log("현재 위치 작업자 mock data를 대신 불러옵니다.");
        // setCand(mock_workers);
      });
  };

  const handleSubmit = () => {
    if (selectedWorkerId) {
      axiosInstance
        .post(`/api/zone-managers/${zoneId}/assign/${selectedWorkerId}`)
        .then((res) => {
          setMode("");
          setRefreshTrigger((prev) => prev + 1);
        })
        .catch((e) => console.log("담당자 지정 실패", e));
    } else {
      return;
    }
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
                disabled={cand?.length === 0}
              >
                {cand.map((c, i) => {
                  return (
                    <option key={i} value={c.workerId}>
                      {c.name} ({c.workerId})
                    </option>
                  );
                })}
                {!cand?.length && (
                  <option disabled value="">
                    선택 가능한 직원이 없습니다
                  </option>
                )}
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
