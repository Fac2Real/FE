import { useState } from "react";
import BasicModal from "./BasicModal";
import axiosInstance from "../../api/axiosInstance";

function ModalContents({ worker, workerList, onSubmit }) {
  const [helpWorkerId, setHelpWorkerId] = useState("");
    // console.log(worker)
  return (
    <>
      <p>도움 요청을 보낼 작업자를 선택하세요</p>
      <div className="input-flex">
        <span>선택된 작업자: {worker.name}</span>
        
      </div>
      <div className="input-flex">
        <span>도움이 필요한 작업자</span>
        <select
          onChange={(e) => setHelpWorkerId(e.target.value)}
          value={helpWorkerId}
        >
          <option value="" disabled>
            작업자를 선택하세요
          </option>
          {workerList.map((worker) => (
            <option key={worker.workerId} value={worker.workerId}>
              {worker.name} ({worker.workerId})
            </option>
          ))}
        </select>
      </div>
      <div className="button-flex">
        <button
          onClick={() => {
            if (helpWorkerId) {
              onSubmit(worker.workerId, helpWorkerId);
            } else {
              alert("모든 작업자를 선택해주세요.");
            }
          }}
        >
          요청 보내기
        </button>
      </div>
    </>
  );
}

export default function SafetyCallModal({ isOpen, onClose, selectWorker, workerList }) {
  const handleSubmit = async (workerId, helpWorkerId) => {
    try {
      await axiosInstance.post("/api/fcm/safety", {
        workerId: workerId,
        careNeedWorkerId: helpWorkerId,
      });
      alert("도움 요청이 성공적으로 전송되었습니다.");
      onClose();
    } catch (error) {
      console.error("도움 요청 전송 실패:", error);
      alert("도움 요청 전송에 실패했습니다.");
    }
  };
console.log(selectWorker)
  if (isOpen) {
    return (
      <BasicModal
        onClose={onClose}
        type="edit"
        modal_contents={{
          title: "작업자 도움 요청",
          contents: (
            <ModalContents worker={selectWorker} workerList={workerList} onSubmit={handleSubmit} />
          ),
        }}
      />
    );
  } else {
    return null;
  }
}