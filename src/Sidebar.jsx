import { Link } from "react-router-dom";
import MenuIcon from "./assets/menu_icon.svg?react";
import HomeIcon from "./assets/home_icon.svg?react";
import MonitorIcon from "./assets/monitor_icon.svg?react";
import ToolIcon from "./assets/tool_icon.svg?react";
import AwardIcon from "./assets/award_icon.svg?react";
import BellIcon from "./assets/bell_icon.svg?react";
import CloseIcon from "./assets/close_icon.svg?react";
import Logo from "./assets/temp_logo.svg?react";
import { useRef, useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const alram_count = 3;
  const [currentPage, setCurrentPage] = useState("Home");
  return (
    <aside className={isOpen ? "sidebar-open" : "sidebar-close"}>
      {!isOpen && (
        <div>
          <span className="icon">
            <Link
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <MenuIcon fill="#FFF" width="1.5rem" />
            </Link>
          </span>
        </div>
      )}
      {isOpen && (
        <div className="sidebar-open">
          <span className="icon">
            <Link>
              <Logo fill="#FFF" width="1.5rem" />
            </Link>
          </span>
          <span className="icon">
            <Link
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <CloseIcon fill="#FFF" width="1.5rem" />
            </Link>
          </span>
        </div>
      )}
      <div className="sidebar-menu">
        <div>
          <span className="icon" onClick={() => setCurrentPage("Home")}>
            <Link to="/">
              <HomeIcon
                fill={currentPage === "Home" ? "#608DFF" : "#FFF"}
                width="1.5rem"
              />
              {isOpen && (
                <p
                  className={`${
                    currentPage === "Home" ? "current-page" : ""
                  } sidebar-open`}
                >
                  대시보드
                </p>
              )}
            </Link>
          </span>
        </div>
        <div>
          <span className="icon" onClick={() => setCurrentPage("Monitor")}>
            <Link>
              <MonitorIcon
                fill={currentPage === "Monitor" ? "#608DFF" : "#FFF"}
                width="1.5rem"
              />
              {isOpen && (
                <p
                  className={`${
                    currentPage === "Monitor" ? "current-page" : ""
                  } sidebar-open`}
                >
                  모니터링
                </p>
              )}
            </Link>
          </span>
        </div>
        <div>
          <span className="icon" onClick={() => setCurrentPage("Sensor")}>
            <Link to="/settings">
              <ToolIcon
                stroke={currentPage === "Sensor" ? "#608DFF" : "#FFF"}
                width="1.5rem"
              />
              {isOpen && (
                <p
                  className={`${
                    currentPage === "Sensor" ? "current-page" : ""
                  } sidebar-open`}
                >
                  센서 관리
                </p>
              )}
            </Link>
          </span>
        </div>
        <div>
          <span
            className="icon"
            onClick={() => setCurrentPage("Certification")}
          >
            <Link>
              <AwardIcon
                stroke={currentPage === "Certification" ? "#608DFF" : "#FFF"}
                width="1.5rem"
              />
              {isOpen && (
                <p
                  className={`${
                    currentPage === "Certification" ? "current-page" : ""
                  } sidebar-open`}
                >
                  인증서 관리
                </p>
              )}
            </Link>
          </span>
        </div>
      </div>
      {
        <div className={isOpen ? "alram-box" : "alram-box sidebar-close"}>
          <span className="icon">
            <Link>
              <BellIcon
                fill={
                  alram_count > 0 ? (isOpen ? "#FFF" : "orangered") : "#FFF"
                }
                width="1.5rem"
              />
            </Link>
            {isOpen && (
              <p className="alram-text">
                {alram_count}건의 새로운 알림이 도착했습니다
              </p>
            )}
          </span>
        </div>
      }
    </aside>
  );
}
