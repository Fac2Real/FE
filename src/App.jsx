import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./Sidebar";
import "./styles/style.css";
import Settings from "./pages/Settings";
import Monitoring from "./pages/Monitoring";
import Certification from "./pages/Certifiaction";
import Safety from "./pages/Safety";
import ZoneDetail from "./pages/ZoneDetail";
import { ToastProvider } from "./contexts/ToastProvider";
import { useState } from "react";
import Login from "./pages/Login";
import Help from "./pages/Help";
import BasicModal from "./components/modal/BasicModal";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  // const [isLogin, setLogin] = useState(true); // 추후 쿠키/토큰 여부로 바꿀 것

  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`sidebar-guard ${isOpen ? "open" : "close"}`}></div>
          <div className="contents">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/zone/:zoneId" element={<ZoneDetail />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<BasicModal />} />
            </Routes>
          </div>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
