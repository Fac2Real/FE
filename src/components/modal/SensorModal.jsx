import { useState } from "react";
import BasicModal from "./BasicModal";

function ModalContents({ onUpdate, sensorInfo }) {
  const { thres, margin } = sensorInfo;
  const [newThres, setNewThres] = useState(thres);
  const [newMargin, setNewMargin] = useState(margin);

  return (
    <>
      <p style={{ color: "gray", marginTop: 0 }}>
        환경 자동제어에 사용되는 값입니다
      </p>
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
        <button onClick={() => onUpdate(newThres, newMargin)}>수정</button>
      </div>
    </>
  );
}

export default function SensorModal({ isOpen, onClose, sensorInfo, onUpdate }) {
  if (isOpen) {
    return (
      <BasicModal
        onClose={onClose}
        type="edit"
        modal_contents={{
          title: `[${sensorInfo.sensorId}] 임계값 변경`,
          contents: (
            <ModalContents sensorInfo={sensorInfo} onUpdate={onUpdate} />
          ),
        }}
      />
    );
  } else {
    return null;
  }
}
