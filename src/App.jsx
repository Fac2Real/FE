import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./styles/style.css";
import SensorSettings from "./pages/SensorSettings";
import SensorList from "./pages/SensorList";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Sidebar />
        <div className="contents">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/monitoring" element={<Monitoring />} /> */}
            <Route path="/sensorsetting" element={<SensorSettings />} />
            <Route path="/sensorlist" element={<SensorList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
