import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./Sidebar";
import "./styles/style2.css";
import Settings from "./pages/Settings";

export default function App2() {
  return (
    <BrowserRouter>
      <div className="main">
        <Sidebar />
        <div className="contents">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
