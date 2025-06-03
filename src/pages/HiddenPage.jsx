import { useState } from "react";
import { teamData } from "../assets/data/teamData";

export default function HiddenPage() {
  const [activeTab, setActiveTab] = useState("Factoreal");

  return (
    <>
      <h1>MEET THE TEAM</h1>
      <div className="box-wrapper">
        <div className="top-box team-tab-box">
          {["Factoreal", "Infra", "IoT", "Service"].map((tab) => (
            <button
              key={tab}
              className={`team-tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab ? "About " : ""}
              {tab}
              {tab !== "Factoreal" ? " Team" : ""}
            </button>
          ))}
        </div>

        <div className="bottom-box team-info-box">
          <p className="team-summary">{teamData[activeTab].content}</p>

          {activeTab !== "Factoreal" && (
            <div className="members-wrapper">
              {teamData[activeTab].members.map((m, i) => (
                <div className="member-card" key={i}>
                  <img
                    src={`https://github.com/2076070.png`}
                    className="member-img"
                    alt={m.name}
                  />
                  <h2 className="member-name">{m.name}</h2>
                  <div className="member-info-1">{m.role}</div>
                  <div className="member-info-2">
                    <strong>EMAIL:</strong> {m.email}
                  </div>
                  <div className="member-info-2">
                    <strong>Github:</strong> {m.github}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab == "Factoreal" && <>
            <div>임시 로고</div>
            <div>팀 설명...</div>
          </>}
        </div>
      </div>
    </>
  );
}