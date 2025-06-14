import { useState } from "react";
import PageIcon from "../assets/page_icon.svg?react";
import MonitorIcon from "./MonitorIcon";
import ZoneCallModal from "./modal/ZoneCallModal";

export default function MonitorBox({ zone }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleAlert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  // 까먹으면안돼!!!!
  zone.level = zone.level ?? 0;

  return (
    <>
      <ZoneCallModal
        zone={zone}
        isOpen={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
      />
      <div
        className={`monitor-box moving-box click-box ${
          zone.level == 0 ? "" : zone.level == 1 ? "warn" : "urgent"
        }`}
      >
        <div className="icon-container">
          <PageIcon width="2rem" stroke="gray" opacity="0.3" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
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
              width: "50%",
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
    </>
  );
}
