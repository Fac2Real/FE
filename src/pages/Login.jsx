import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/login.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const nav = useNavigate();

  const [showRobot, setShowRobot] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      const val = window.innerWidth;
      setShowRobot(val > 600);
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    const response = axiosInstance.post("/api/auth/login", {
      username: userId,
      password: userPassword,
    }).then((res) => {
      console.log("로그인 성공");
      console.log(res.data);
      axiosInstance.get("/api/abnormal/unread-count")
      nav("/");
    }).catch((e) => {
      console.log("로그인 실패");
      console.log(e);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    });
    console.log(response);
  };
  return (
    <>
      <div className="login-body">
        <div className="login-container">
          {showRobot && (
            <img
              src="src\assets\img\monitory_character_sit.png"
              className="robot-sit"
            />
          )}
          <h1 style={{ color: "orange", marginBottom: "2rem" }}>LOGIN</h1>
          <form
            className="login-input"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="text"
              value={userId}
              id="userId"
              name="userId"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="아이디를 입력하세요"
              autoComplete="username"
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
              autoComplete="current-password"
            ></input>
            <div className="login-button">
              <button type="submit">로그인 ⇀</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
