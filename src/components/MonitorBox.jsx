import PageIcon from "../assets/page_icon.svg?react";

export default function MonitorBox({ zone }) {
  return (
    <div
      className={`monitor-box moving-box click-box ${
        zone.level == 0 ? "" : zone.level == 1 ? "warn" : "urgent"
      }`}
    >
      <div className="icon-container">
        <PageIcon width="2.3rem" stroke="gray" opacity="0.3" />
      </div>
      <h3>{zone.zoneName}</h3>
      {zone.level === 0 ? null : <p>문제 발생: {zone.abnormal_sensor}</p>}
      {zone.level !== 0 && (
        <button className="no-flex-button urgent">
          {zone.level === 2 ? "긴급 알림" : "주의 알림"}
        </button>
      )}
      <div className="spacer" />
    </div>
  );
}
