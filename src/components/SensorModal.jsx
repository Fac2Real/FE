import { useState } from "react";
import XIcon from "../assets/x_icon.svg?react";

export default function SensorModal({ isOpen, onClose, sensorInfo, onUpdate }) {
  if (isOpen) {
    const { zoneName, sensorId, thres, margin } = sensorInfo;
    const [newThres, setNewThres] = useState(thres);
    const [newMargin, setNewMargin] = useState(margin);
    // console.log(sensorInfo);
    return (
      <>
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div onClick={onClose}>
              <XIcon width="1.5rem" height="1.5rem" />
            </div>
            <div className="modal-contents">
              <span>
                [{zoneName}]의 [{sensorId}] 임계값 변경
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
                <span>허용 오차</span>
                <input
                  type="number"
                  value={newMargin}
                  onChange={(e) => {
                    setNewMargin(Number(e.target.value));
                  }}
                ></input>
              </div>

              <div className="button-flex">
                <button onClick={() => onUpdate(newThres, newMargin)}>
                  수정
                </button>
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
