import { useState } from "react";
import XIcon from "../assets/x_icon.svg?react";

export default function SensorModal({ isOpen, onClose, sensorInfo, onUpdate }) {
  if (isOpen) {
    const { zoneName, sensorName, thres } = sensorInfo;
    const [newThres, setNewThres] = useState(thres);
    return (
      <>
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div onClick={onClose}>
              <XIcon width="1.5rem" height="1.5rem" />
            </div>
            <div className="modal-contents">
              <span>
                [{zoneName}]의 [{sensorName}] 임계값 변경
              </span>
              <div className="input-flex">
                <span>센서 임계값</span>
                <input
                  type="number"
                  value={newThres}
                  onChange={(e) => {
                    setNewThres(Number(e.target.value));
                  }}
                ></input>
              </div>
              <div className="button-flex">
                <button onClick={() => onUpdate(newThres)}>수정</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
