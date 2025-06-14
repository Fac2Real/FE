import MainBox from "../components/MainBox";
import MiniBox from "../components/MiniBox";
import PulseIcon from "../assets/pulse_icon.svg?react";
import WorkerIcon from "../assets/worker_icon.svg?react";
import MachineIcon from "../assets/machine_icon.svg?react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home({ isSidebarOpen }) {
  const icon_color = "#1d4a7a";
  return (
    <>
      <MainBox isSidebarOpen={isSidebarOpen} />
      <div className="mini-row">
        <Link to="/monitoring" className="link-as-contents">
          <MiniBox
            title="실시간 모니터링"
            icon={<PulseIcon opacity="0.75" width="4rem" stroke={icon_color} />}
          />
        </Link>
        <Link to="/safety" className="link-as-contents">
          <MiniBox
            title="작업자 안전 관리"
            icon={<WorkerIcon opacity="0.75" width="4rem" fill={icon_color} />}
          />
        </Link>
        <Link to="/settings" className="link-as-contents">
          <MiniBox
            title="설비/센서 관리"
            icon={<MachineIcon opacity="0.75" width="4rem" fill={icon_color} />}
          />
        </Link>
      </div>
      {/* <Link to="/help">
        <div className="help-link">
          <QuestionIcon width="1rem" fill="gray" opacity="0.7" />
          <span>모니토리 사용법</span>
        </div>
      </Link> */}
    </>
  );
}
