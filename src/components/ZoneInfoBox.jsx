import { useState } from "react";

export default function ZoneInfoBox({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const addZone = title === "공간 추가";
  return (
    <div className="box-wrapper">
      <div
        className={`top-box ${isOpen ? "" : "moving-box"} ${
          addZone && "add-zone"
        }`}
      >
        {title}
        <span className="arrow" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "▲" : addZone ? "＋" : "▼"}
        </span>
      </div>

      <div className={`bottom-box ${isOpen ? "open" : "closed"}`}>
        {!addZone && (
          <>
            <div className="sensorlist">
              <div className="sensorlist-underbar">공간 환경 센서</div>
              <p>공간 환경 센서가 없습니다</p>
            </div>
            <div className="sensorlist">
              <div className="sensorlist-underbar">설비 관리 센서</div>
              <p>설비 관리 센서가 없습니다</p>
            </div>
            <div className="sensorlist">
              <div className="sensorlist-underbar">담당자</div>
              <p>담당자가 없습니다</p>
            </div>
          </>
        )}
        {addZone && (
          <div className="add-zone">
            <div className="input-flex">
              <label htmlFor="zoneName">공간 이름</label>
              <input
                id="zoneName"
                name="zoneName"
                placeholder="공간 이름을 입력하세요"
              />
            </div>
            <div className="button-flex">
              <button>등록</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
