export default function MonitorBox({ zone }) {
  return (
    <div
      className={`monitor-box moving-box ${
        zone.level == 0 ? "" : zone.level == 1 ? "warn" : "urgent"
      }`}
    >
      <p>{zone.title}</p>
    </div>
  );
}
