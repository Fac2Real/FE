import { useState } from "react";
import BasicModal from "./BasicModal";

function ModalContents({ onUpdate }) {
  const [newZoneName, setNewZoneName] = useState("");
  return (
    <>
      <div className="input-flex">
        <span>새 이름</span>
        <input
          type="text"
          value={newZoneName}
          onChange={(e) => {
            setNewZoneName(e.target.value);
          }}
        ></input>
      </div>
      <div className="button-flex">
        <button onClick={() => onUpdate(newZoneName)}>변경</button>
      </div>
    </>
  );
}

export default function EditModal({ isOpen, onClose, zoneName, onUpdate }) {
  if (isOpen) {
    return (
      <BasicModal
        onClose={onClose}
        type="edit"
        modal_contents={{
          title: `구역 [${zoneName}]의 이름 변경`,
          contents: <ModalContents onUpdate={onUpdate} />,
        }}
      />
    );
  } else {
    return null;
  }
}
