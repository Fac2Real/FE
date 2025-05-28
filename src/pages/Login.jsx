import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const nav = useNavigate();
  const handleLogin = () => {
    const response = axiosInstance.post("/api/auth/login", {
      username: userId,
      password: userPassword,
    }).then((res) => {
      console.log("로그인 성공");
      console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userId", userId);
    }).catch((e) => {
      console.log("로그인 실패");
      console.log(e);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    });
    console.log(response);
    nav(`/`);
  };
  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <h2 style={{ color: "orange", marginBottom: "1.5rem" }}>MONITORY</h2>
          {/* <div className="character-circle"></div> */}
          <div className="login-input">
            <input
              type="text"
              value={userId}
              id="userId"
              name="userId"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="아이디를 입력하세요"
            ></input>
            <input
              type="password"
              value={userPassword}
              id="userPassword"
              name="userPassword"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요"
            ></input>
            <div className="login-button">
              <button onClick={handleLogin}>로그인 ⇀</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
