import { useState } from "react";
import BasicModal from "./BasicModal";
import ModalPortal from "../ModalPortal";

function ModalContents({ equipInfo, onUpdate, onClose }) {
  const [newDate, setNewDate] = useState(new Date());
  return (
    <>
      <div className="input-flex" style={{ marginLeft: 0, marginTop: 0 }}>
        <input
          style={{ textAlign: "center" }}
          type="date"
          value={newDate}
          onChange={(e) => {
            setNewDate(e.target.value);
          }}
        ></input>
      </div>
      <div className="button-flex">
        <button
          onClick={() => {
            const today = new Date();
            const selectedDay = new Date(newDate);
            if (selectedDay > today) {
              alert("오늘 이후의 날짜는 선택할 수 없습니다.");
              return;
            }
            onUpdate(newDate, equipInfo);
            onClose();
          }}
        >
          변경
        </button>
      </div>
    </>
  );
}

export default function EquipDateModal({
  isOpen,
  onClose,
  equipInfo,
  onUpdate,
}) {
  if (isOpen) {
    return (
      <ModalPortal>
        <BasicModal
          onClose={onClose}
          type="edit"
          modal_contents={{
            title: `[${equipInfo.equipName}]의 점검일자 업데이트`,
            contents: <ModalContents {...{ equipInfo, onUpdate, onClose }} />,
          }}
        />
      </ModalPortal>
    );
  }
}
