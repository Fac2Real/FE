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
      <h3>{zone.title}</h3>
      {/* <p>확인 필요: 습도</p> */}
      {zone.level == 2 && (
        <button className="no-flex-button urgent">담당자 긴급 호출</button>
      )}
      <div className="spacer" />
    </div>
  );
}
