import { useState } from "react";
import ToolIcon from "../assets/tool_icon.svg?react";
export default function ZoneInfoBox({
  zone,
  sensorModalBtn,
  facilityModalBtn,
  onAddZone = null,
}) {
  const { title, env_sensor = [], facility = [], master = "" } = zone;
  const [isOpen, setIsOpen] = useState(false);
  const addZone = zone === "공간 추가";
  const [newZone, setNewZone] = useState("");
  const [facilityInfoOpen, setFacilityInfoOpen] = useState({});

  const toggleFacility = (i) => {
    setFacilityInfoOpen((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  return (
    <div className="box-wrapper">
      <div
        className={`top-box ${isOpen ? "" : "moving-box"} ${
          addZone && "add-zone"
        }`}
      >
        {addZone ? "공간 추가" : title}
        <span className="arrow" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "▲" : addZone ? "＋" : "▼"}
        </span>
      </div>

      <div className={`bottom-box ${isOpen ? "open" : "closed"}`}>
        {!addZone && (
          <>
            <div className="sensorlist">
              <div className="sensorlist-underbar">공간 환경 센서</div>
              {env_sensor.length === 0 && <p>공간 환경 센서가 없습니다</p>}
              {env_sensor.length !== 0 &&
                env_sensor.map((sen, i) => (
                  <div className="list-text" key={i}>
                    <div>
                      {sen.name}
                      <span className="sensor-id">({sen.sensorId})</span>{" "}
                    </div>
                    <span className="dash-line"></span>
                    <div>현재 설정값: {sen.thres}</div>
                    <span
                      onClick={() =>
                        sensorModalBtn(title, sen.sensorId, sen.thres)
                      }
                    >
                      <ToolIcon
                        className="thres-setting"
                        width="1.3rem"
                        fill="gray"
                        stroke="gray"
                      />
                    </span>
                  </div>
                ))}
            </div>
            <div className="sensorlist">
              <div className="sensorlist-underbar">설비 관리 센서</div>
              {facility.length === 0 && <p>등록된 설비가 없습니다</p>}
              {facility.length !== 0 &&
                facility.map((f, i) => (
                  <div key={i}>
                    {/* 설비 목록 */}
                    <div className="list-text">
                      <div>{f.name}</div>
                      <span className="dash-line"></span>
                      <span className="arrow" onClick={() => toggleFacility(i)}>
                        {facilityInfoOpen[i] ? "▲" : "▼"}
                      </span>
                    </div>
                    {/* 설비 센서 목록 */}
                    {facilityInfoOpen[i] && (
                      <div style={{ margin: "0 1rem" }}>
                        {(!Array.isArray(f.fac_sensor) ||
                          f.fac_sensor.length === 0) && (
                          <p>설비 관리용 센서가 없습니다</p>
                        )}
                        {f.fac_sensor?.length !== 0 &&
                          f.fac_sensor?.map((s, i) => (
                            <p key={i}>
                              {s.name} ({s.id})
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              <p>
                <button
                  className="no-flex-button add-fac"
                  onClick={() => facilityModalBtn(title)}
                >
                  + 설비 등록
                </button>
              </p>
            </div>
            <div className="sensorlist">
              <div className="sensorlist-underbar">담당자</div>
              {master == "" && <p>담당자가 없습니다</p>}
              {master && <p>{master}</p>}
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
                value={newZone}
                onChange={(e) => setNewZone(e.target.value)}
                placeholder="공간 이름을 입력하세요"
              />
            </div>
            <div className="button-flex">
              <button
                onClick={() => {
                  onAddZone(newZone);
                  setNewZone("");
                }}
              >
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
