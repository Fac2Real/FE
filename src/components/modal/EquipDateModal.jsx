import { useState } from "react";
import BasicModal from "./BasicModal";

function ModalContents({ equipInfo, onUpdate, onClose }) {
  const [newDate, setNewDate] = useState();
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
      <BasicModal
        onClose={onClose}
        type="edit"
        modal_contents={{
          title: `[${equipInfo.equipName}]의 점검일자 업데이트`,
          contents: <ModalContents {...{ equipInfo, onUpdate, onClose }} />,
        }}
      />
    );
  }
}
