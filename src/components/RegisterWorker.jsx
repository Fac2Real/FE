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

  useEffect(() => {
    axiosInstance
      .get("/api/zones")
      .then((res) => setZoneList(res.data.data))
      .catch((e) => {
        setZoneList([]);
      });
  }, []);

  const handleCheckboxChange = (e, zoneName) => {
    if (selectedZones.includes(zoneName)) {
      const tmp = selectedZones?.filter((zone) => zone !== zoneName);
      setSelectedZones(tmp);
    } else {
      const tmp = [...selectedZones, zoneName];
      setSelectedZones(tmp);
    }
  };

  const formatPhoneNumber = (value) => {
    const onlyNums = value.replace(/[^\d]/g, "").slice(0, 11); // 숫자만, 최대 11자리

    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7
    )}`;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: field === "phoneNumber" ? formatPhoneNumber(value) : value,
    }));
  };

  const handleSubmit = () => {
    let isValid = true;
    let invalidList = [];
    const { workerId, name, phoneNumber, email } = formData;
    if (
      [workerId, name, phoneNumber, email].some(
        (val) => val.replace(/\s+/g, "") === ""
      )
    ) {
      isValid = false;
    }
    const workerIdPattern = /^(19|20)\d{2}\d{4}$/; // 19XXYYYY ~ 20XXYYYY 형식
    const phonePattern = /^\d{3}-\d{4}-\d{4}$/; // 하이픈 포함해서 XXX-YYYY-ZZZZ 형식
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // x@y.z 형식
    const namePattern = /^[가-힣a-zA-Z\s]+$/; // 이름은 문자여야 함

    if (!workerIdPattern.test(workerId)) {
      isValid = false;
      invalidList.push("사번");
    }
    if (!namePattern.test(name)) {
      isValid = false;
      invalidList.push("이름");
    }
    if (!phonePattern.test(phoneNumber)) {
      isValid = false;
      invalidList.push("전화번호");
    }
    if (!emailPattern.test(email)) {
      isValid = false;
      invalidList.push("이메일");
    }

    if (!isValid) {
      alert(`입력값이 올바른지 확인하세요: ${invalidList.join(", ")}`);
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
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          zoneNames: selectedZones,
        })
        .then((res) => {
          fetchWorkers();
          alert("등록되었습니다!");
        })
        .catch((e) => {
          if (e.response.status == 409) {
            alert(e.response.data.message);
            return;
          }
        });
    } else {
      return;
    }
  };

  return (
    <div className="worker-register">
      <h2 style={{ fontSize: "1.25rem" }}>작업자 등록</h2>
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
            value={formData.name}
            onChange={handleInputChange("name")}
          ></input>
        </div>
        <div className="form-row">
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            className="text-input"
            value={formData.phoneNumber}
            onChange={handleInputChange("phoneNumber")}
          ></input>
        </div>
        <div className="form-row">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            className="text-input"
            value={formData.email}
            onChange={handleInputChange("email")}
          ></input>
        </div>
        <div className="form-row">
          <label>출입 가능한 공간</label>
          <div className="checkbox-group">
            {zoneList?.map((z) => {
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
