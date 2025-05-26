import { useState } from "react";
import ToolIcon from "../assets/tool_icon.svg?react";
function GaugeBar({ percent }) {
  const bgColor =
    percent >= 70 ? "#FF4D4F" : percent >= 40 ? "#FAAD14" : "#52C41A";
  return (
    <div className="gauge-bar">
      <div
        className="gauge-fill"
        style={{ width: `${percent}%`, backgroundColor: bgColor }}
      ></div>
    </div>
  );
}
function EquipItem({ equip }) {
  const [isOpen, setIsOpen] = useState(false);
  const dday = 30; /* 오늘 ~ 예상점검일 */
  const percent = 50; /* 마지막 점검일 ~ 오늘 / 마지막 점검일 ~ 예상 점검일 */
  return (
    <>
      <div className="sensorlist">
        <div className="sensorlist-underbar">
          <strong>{equip.name}</strong>
        </div>
        <div className="list-text">
          <div>센서 목록</div>
          <span className="dash-line"></span>
          <span
            className="arrow"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? "▲" : "▼"}
          </span>
        </div>
        {isOpen && (
          <div style={{ margin: "0 1rem" }}>
            {equip.sensors.map((s) => {
              return (
                <span key={s.id}>
                  {s.name}({s.id}){" "}
                </span>
              );
            })}
          </div>
        )}
        <div className="list-text">
          <div>예상 교체 일자</div>
          <span className="dash-line"></span>
          <span>({equip?.pred ? equip?.pred : "2025-06-26"})</span>
        </div>
        <div className="list-text">
          <div>예상 교체일까지 D-{dday}</div>
          <GaugeBar percent={percent} />
        </div>
        <div className="list-text">
          <div>최근 교체 일자</div>
          <span className="dash-line"></span>
          <span>
            ({equip?.recent ? equip?.recent : "2025-03-26"})
            <ToolIcon
              className="thres-setting"
              width="1.3rem"
              fill="gray"
              stroke="gray"
              style={{ transform: "translateY(4px)" }}
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default function Equip({ zoneId, equips }) {
  return (
    <>
      {equips.length === 0 && <p>등록된 설비가 없습니다</p>}
      {!(equips.length === 0) &&
        equips.map((e) => {
          return <EquipItem key={e.equipId} equip={e} />;
        })}
    </>
  );
}
