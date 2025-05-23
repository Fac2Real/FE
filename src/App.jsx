import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./Sidebar";
import "./styles/style.css";
import Settings from "./pages/Settings";
import Monitoring from "./pages/Monitoring";
import Certification from "./pages/Certifiaction";
import Safety from "./pages/Safety";
import Facility from "./pages/Facility";
import ZoneDetail from "./pages/ZoneDetail";
import { ToastProvider } from "./contexts/ToastProvider";
import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`sidebar-guard ${isOpen ? "open" : "close"}`}></div>
          <div className="contents">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/facility" element={<Facility />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/zone/:zoneId" element={<ZoneDetail />} />
            </Routes>
          </div>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
