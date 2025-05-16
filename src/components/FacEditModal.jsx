import { useState } from "react";
import XIcon from "../assets/x_icon.svg?react";

export default function FacEditModal({
  isOpen,
  onClose,
  facName,
  equipId,
  onUpdate,
}) {
  if (isOpen) {
    const [newFacName, setNewFacName] = useState("");
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div onClick={onClose}>
            <XIcon width="1.5rem" height="1.5rem" />
          </div>
          <div className="modal-contents">
            <span>[{facName}]의 이름 변경</span>
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
              <button onClick={() => onUpdate(newFacName, equipId)}>
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
