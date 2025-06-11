import { useState } from "react";
import BasicModal from "./BasicModal";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/table.css";

function ModalContents({ worker, equipList, onSubmit }) {
  const [selectedEquipId, setSelectedEquipId] = useState("");
  console.log(equipList);
  return (
    <>
      <p>
        장비 유지보수를 요청할 작업자: {worker.name} ({worker.workerId})
      </p>
      <div className="input-flex">
        <span>설비 선택</span>
        <select
          value={selectedEquipId}
          onChange={(e) => setSelectedEquipId(e.target.value)}
        >
          <option value="" disabled>
            설비를 선택하세요
          </option>
          {equipList.map((equip) => (
            <option key={equip.equipId} value={equip.equipId}>
              {equip.equipName} ({equip.equipId})
            </option>
          ))}
        </select>
      </div>
      <div className="button-flex">
        <button
          onClick={() => {
            if (selectedEquipId) {
              onSubmit(worker.workerId, selectedEquipId);
            } else {
              alert("설비를 선택해주세요.");
            }
          }}
        >
          요청 보내기
        </button>
      </div>
    </>
  );
}

export default function EquipMaintainCallModal({
  isOpen,
  onClose,
  worker,
  equipList,
}) {
  const handleSubmit = async (workerId, equipId) => {
    try {
      await axiosInstance.post("/api/fcm/equip", {
        workerId,
        equipId,
      });
      alert("유지보수 요청이 성공적으로 전송되었습니다.");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("유지보수 요청 전송 실패:", error);
      alert("유지보수 요청 전송에 실패했습니다.");
    }
  };

  if (isOpen) {
    return (
      <BasicModal
        onClose={onClose}
        modal_contents={{
          title: "장비 유지보수 요청",
          contents: (
            <ModalContents
              worker={worker}
              equipList={equipList}
              onSubmit={handleSubmit}
            />
          ),
        }}
      />
    );
  } else {
    return null;
  }
}
