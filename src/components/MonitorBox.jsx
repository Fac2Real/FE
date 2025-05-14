import PageIcon from "../assets/page_icon.svg?react";
import MonitorIcon from "./MonitorIcon";

export default function MonitorBox({ zone }) {
  const handleAlert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("알림용 모달을 열까...");
  };
  return (
    <div
      className={`monitor-box moving-box click-box ${
        zone.level == 0 ? "" : zone.level == 1 ? "warn" : "urgent"
      }`}
    >
      <div className="icon-container">
        <PageIcon width="2.3rem" stroke="gray" opacity="0.3" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <MonitorIcon
          abnormal_sensor={zone.abnormal_sensor}
          level={zone.level}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "2rem",
          }}
        >
          <h3>{zone.zoneName}</h3>
          {zone.level === 0 ? null : (
            <button className="no-flex-button urgent" onClick={handleAlert}>
              {zone.level === 2 ? "긴급 알림" : "주의 알림"}
            </button>
          )}
        </div>
      </div>
      <div className="spacer" />
    </div>
  );
}
