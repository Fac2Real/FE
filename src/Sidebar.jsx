import { BrowserRouter, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar-body">
        <div className="logo-img">
          <h1>Monitory</h1>
        </div>
        <div className="">
          <h2>Menu</h2>
          <hr></hr>
          <h3>종합 리포트</h3>
          <p>모니터링 현황</p>
          <p>공장설비 현황</p>
          <p>시스템 로그</p>
          <h3>기기 관리</h3>
          <Link to="/sensorlist">기기 목록</Link>
          <Link to="/sensorsetting">기기 등록/수정</Link>
        </div>
      </div>
    </>
  );
}

{
  /* <Route path="/" element={<SensorSettings />} />
<Route path="/sensorlist" element={<SensorList />} /> */
}
