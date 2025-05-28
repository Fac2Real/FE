import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const nav = useNavigate();
  const handleLogin = () => {
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
