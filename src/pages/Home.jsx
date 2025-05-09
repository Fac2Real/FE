import MainBox from "../components/MainBox";
import MiniBox from "../components/MiniBox";
import PulseIcon from "../assets/pulse_icon.svg?react";
import WorkerIcon from "../assets/worker_icon.svg?react";
import MachineIcon from "../assets/machine_icon.svg?react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>대시보드</h1>
      <MainBox />
      <div className="mini-row">
        <Link to="/monitoring" className="link-as-contents">
          <MiniBox
            title="실시간 모니터링"
            icon={<PulseIcon width="5rem" stroke="#c1bebe" />}
          />
        </Link>
        <Link to="/safety" className="link-as-contents">
          <MiniBox
            title="작업자 안전관리"
            icon={<WorkerIcon width="5rem" fill="#c1bebe" />}
          />
        </Link>
        <Link to="/facility" className="link-as-contents">
          <MiniBox
            title="설비 관리"
            icon={<MachineIcon width="5rem" fill="#c1bebe" />}
          />
        </Link>
      </div>
    </>
  );
}
