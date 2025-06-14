import { useState } from "react";
import BasicModal from "./BasicModal";

function ModalContents({ onUpdate, equipId }) {
  const [newFacName, setNewFacName] = useState("");
  return (
    <>
      <div className="input-flex">
        <span>새 이름</span>
        <input
          type="text"
          value={newFacName}
          onChange={(e) => {
            setNewFacName(e.target.value);
          }}
        ></input>
      </div>
      <div className="button-flex">
        <button
          onClick={() => {
            if (newFacName == "empty") {
              alert("설비명 empty는 사용할 수 없습니다");
              return;
            }
            onUpdate(newFacName, equipId);
          }}
        >
          변경
        </button>
      </div>
    </>
  );
}

export default function FacEditModal({
  isOpen,
  onClose,
  facName,
  equipId,
  onUpdate,
}) {
  if (isOpen) {
    return (
      <BasicModal
        onClose={onClose}
        type="edit"
        modal_contents={{
          title: `설비 [${facName}]의 이름 변경`,
          contents: <ModalContents {...{ onUpdate, equipId }} />,
        }}
      />
    );
  } else {
    return null;
  }
}
