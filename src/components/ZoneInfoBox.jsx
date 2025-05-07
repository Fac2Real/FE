import { useState } from "react";
import ToolIcon from "../assets/tool_icon.svg?react";
export default function ZoneInfoBox({ zone, modalBtn, onAddZone = null }) {
  const { title, env_sensor = [], fac_sensor = [], master = "" } = zone;
  const [isOpen, setIsOpen] = useState(false);
  const addZone = zone === "공간 추가";
  const [newZone, setNewZone] = useState("");
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
                    {/* <div>{sen.name}</div> */}
                    <div>
                     {sen.name}
                     <span className="sensor-id"> ({sen.id})</span>   {/* ← 추가 */}
                    </div>
                    <span className="dash-line"></span>현재 설정값:{" "}
                    <div>{sen.thres}</div>
                    <span onClick={() => modalBtn(title, sen.name, sen.thres)}>
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
              {fac_sensor.length === 0 && <p>설비 관리 센서가 없습니다</p>}
              {fac_sensor.length !== 0 &&
                fac_sensor.map((sen, i) => (
                  <div className="list-text" key={i}>
                    {/* <div>{sen}</div> */}
                    <div>{sen.name}
                      <span className="sensor-id"> ({sen.id})</span>
                    </div>
                    <span className="dash-line"></span>현재 설정값: 
                    <div>{sen.thres}</div>
                    <span onClick={() => modalBtn(title, sen.name, sen.thres)}>
                    <ToolIcon className="thres-setting" width="1.3rem" fill="gray" stroke="gray" />
                    </span>  
                  </div>
                ))}
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
