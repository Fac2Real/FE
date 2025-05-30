import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function RegisterWorker({ fetchWorkers }) {
  const [zoneList, setZoneList] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [formData, setForm] = useState({
    workerId: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const formattedPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("+82")) {
      return phoneNumber;
    } else {
      return "+82" + phoneNumber.slice(-10);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/api/zones")
      .then((res) => setZoneList(res.data.data))
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
    if (
      Object.values(formData).some(
        (val) => val.replace(/\s+/g, "").length === 0
      )
    ) {
      // 공백 제거
      alert("입력값을 확인하세요");
      return;
    }
    if (
      window.confirm(
        `${formData.name}(${formData.workerId})를 등록하시겠습니까?`
      )
    ) {
      axiosInstance
        .post(`/api/workers`, {
          workerId: formData.workerId,
          name: formData.name,
          phoneNumber: formattedPhoneNumber(formData.phoneNumber),
          email: formData.email,
          zoneNames: selectedZones,
        })
        .then((res) => {
          fetchWorkers();
          alert("등록되었습니다!");
        })
        .catch((e) => {
          console.log("작업자 등록 실패");
        });
    } else {
      return;
    }
  };

  return (
    <div className="worker-register">
      <h2>작업자 등록·수정</h2>
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
