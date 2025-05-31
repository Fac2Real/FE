import { useState } from "react";
import ToolIcon from "../assets/tool_icon.svg?react";
function GaugeBar({ percent }) {
  console.log("percent: ", percent);
  const bgColor =
    percent >= 70 ? "#FF4D4F" : percent >= 40 ? "#FAAD14" : "#52C41A";
  return (
    <div className="gauge-bar">
      <div
        className="gauge-fill"
        style={{
          width: `${percent == 0 ? 0 : Math.max(5, percent)}%`,
          backgroundColor: bgColor,
          borderRadius: percent >= 80 ? "999px" : "999px 0 0 999px",
        }}
      ></div>
    </div>
  );
}
function EquipItem({ equip, selectEquip, openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const test_date = "2025-06-30"; // 예상교체일자 (하드코딩!!!!)

  const tmp = 1000 * 60 * 60 * 24;
  const today = new Date();
  const last = new Date(
    equip.lastCheckDate ? equip.lastCheckDate : "연결 오류"
  );
  const pred = new Date(equip.pred ? equip.pred : test_date);
  const dDay = Math.ceil((pred - today) / tmp);

  let percent = 0;
  if (last < pred && last <= today) {
    percent = Math.ceil(((today - last) / (pred - last)) * 100);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
  } else {
    percent = 0;
  }

  return (
    <>
      <div className="sensorlist">
        <div className="sensorlist-underbar">
          <strong>{equip.equipName}</strong>
        </div>
        {/* <div className="list-text">
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
        )} */}
        <div className="list-text">
          <div>예상 교체 일자</div>
          <span className="dash-line"></span>
          <span>({equip?.pred ? equip?.pred : test_date})</span>
        </div>
        <div className="list-text">
          <div>예상 교체일까지 D-{dDay}</div>
          <GaugeBar percent={percent} />
        </div>
        <div className="list-text">
          <div>최근 점검 일자</div>
          <span className="dash-line"></span>
          <span>
            ({equip && equip.lastCheckDate ? equip.lastCheckDate : test_date}
            )
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
      {/* length가 1인 이유 : empty 설비 때문에... */}
      {equips.length === 1 && <p>등록된 설비가 없습니다</p>}
      {!(equips.length === 0) &&
        equips.map((e, i) => {
          if (e.equipName == "empty") {
            return;
          }
          return (
            <EquipItem
              key={i}
              equip={e}
              selectEquip={modalParam.setSelectedEquip}
              openModal={modalParam.openModal}
            />
          );
        })}
    </>
  );
}
