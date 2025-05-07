import { useState } from "react";
import XIcon from "../assets/x_icon.svg?react";

export default function FacilityModal({ isOpen, onClose, zoneInfo, onUpdate }) {
  if (isOpen) {
    const [newFacility, setNewFacility] = useState("");
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div onClick={onClose}>
            <XIcon width="1.5rem" height="1.5rem" />
          </div>
          <div className="modal-contents">
            <span>[{zoneInfo}]의 설비 추가</span>
            <div className="input-flex">
              <span>설비 이름</span>
              <input
                type="text"
                value={newFacility}
                onChange={(e) => {
                  setNewFacility(e.target.value);
                }}
              ></input>
            </div>
            <div className="button-flex">
              <button onClick={() => onUpdate(newFacility)}>추가</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
