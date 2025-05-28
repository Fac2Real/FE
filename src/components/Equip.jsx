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
function EquipItem({ equip, selectEquip, openModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const tmp = 1000 * 60 * 60 * 24;
  const today = new Date();
  const last = new Date(
    equip.lastUpdateDate ? equip.lastUpdateDate : "2025-06-26"
  );
  const pred = new Date(equip.pred ? equip.pred : "2025-06-26");

  const dDay = Math.ceil((pred - today) / tmp);

  let percent = 3; // 1, 2일 때 모양이 안 이뻐서...
  if (pred - last > 2) {
    percent = Math.ceil(((today - last) / (pred - last)) * 100);
  }
  return (
    <>
      <div className="sensorlist">
        <div className="sensorlist-underbar">
          <strong>{equip.equipName}</strong>
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
                <span key={s.sensorId}>
                  {s.sensorType}({s.sensorId}){" "}
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
          <div>예상 교체일까지 D-{dDay}</div>
          <GaugeBar percent={percent} />
        </div>
        <div className="list-text">
          <div>최근 교체 일자</div>
          <span className="dash-line"></span>
          <span>
            ({equip?.lastUpdateDate ? equip?.lastUpdateDate : "2025-03-26"})
            <ToolIcon
              className="thres-setting"
              width="1.3rem"
              fill="gray"
              stroke="gray"
              style={{ transform: "translateY(4px)" }}
              onClick={() => {
                selectEquip(equip);
                openModal(true);
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default function Equip({ equips, modalParam }) {
  return (
    <>
      {equips.length === 0 && <p>등록된 설비가 없습니다</p>}
      {!(equips.length === 0) &&
        equips.map((e, i) => {
          if (e.equipName == "empty") {
            return;
          }
          return (
            <EquipItem
              key={e.equipId}
              equip={e}
              selectEquip={modalParam.setSelectedEquip}
              openModal={modalParam.openModal}
            />
          );
        })}
    </>
  );
}
