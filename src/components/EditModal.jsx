import { useState } from "react";
import XIcon from "../assets/x_icon.svg?react";

export default function EditModal({ isOpen, onClose, zoneName, onUpdate }) {
  if (isOpen) {
    const [newZoneName, setNewZoneName] = useState("");
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div onClick={onClose}>
            <XIcon width="1.5rem" height="1.5rem" />
          </div>
          <div className="modal-contents">
            <span>[{zoneName}]의 이름 변경</span>
            <div className="input-flex">
              <span>새 구역 이름</span>
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
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
