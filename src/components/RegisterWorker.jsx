import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function RegisterWorker() {
  const [zoneList, setZoneList] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [formData, setForm] = useState({
    workerId: "",
    name: "",
    phoneNumber: "",
    email: "",
  });
  useEffect(() => {
    axiosInstance
      .get("/api/zones")
      .then((res) => setZoneList(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleCheckboxChange = (e, zoneName) => {
    if (selectedZones.includes(zoneName)) {
      const tmp = selectedZones.filter((zone) => zone !== zoneName);
      setSelectedZones(tmp);
    } else {
      const tmp = [...selectedZones, zoneName];
      setSelectedZones(tmp);
    }
  };

  const handleInputChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(
      `전달할 정보: ${formData.workerId} ${formData.name} ${formData.phoneNumber} ${formData.email}`
    );
    console.log(`출입가능 공간: ${selectedZones}`);
  };

  return (
    <div className="worker-register">
      <h2>작업자 등록 </h2>
      <div className="form-container">
        <div className="form-row">
          <label htmlFor="workerId">사번</label>
          <input
            value={formData.workerId}
            onChange={handleInputChange("workerId")}
            id="workerId"
            name="workerId"
            className="text-input"
          ></input>
        </div>
        <div className="form-row">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            name="name"
            className="text-input"
            onChange={handleInputChange("name")}
          ></input>
        </div>
        <div className="form-row">
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            className="text-input"
            onChange={handleInputChange("phoneNumber")}
          ></input>
        </div>
        <div className="form-row">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            className="text-input"
            onChange={handleInputChange("email")}
          ></input>
        </div>
        <div className="form-row">
          <label>출입 가능한 공간</label>
          <div className="checkbox-group">
            {zoneList.map((z) => {
              return (
                <span key={z.zoneId}>
                  <input
                    id={z.zoneName}
                    name={z.zoneName}
                    type="checkbox"
                    value={z.zoneName}
                    checked={selectedZones.includes(z.zoneName)}
                    onChange={(e) => handleCheckboxChange(e, z.zoneName)}
                  ></input>
                  <label htmlFor={z.zoneName}>{z.zoneName}</label>
                </span>
              );
            })}
          </div>
        </div>
        <div className="button-flex">
          <button onClick={handleSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
}
