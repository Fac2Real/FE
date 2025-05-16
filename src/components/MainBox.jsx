import { useState } from "react";

export default function MainBox() {
  /* 아래 값은 언젠가 받아올 것이다 ... */
  // const [rank, setRank] = useState(null);
  // const safetyRank = true;
  // const facilityRank = true;

  // test :: A등급 예
  const [rank, setRank] = useState("A");
  let safetyRank = true;
  let facilityRank = true;

  let title;
  let color = { boxColor: null, donutColor: null, textColor: null };

  if (rank) {
    if (rank === "A") {
      title = "A등급 인증서를 받을 수 있어요 😄";
      color.boxColor = "#e1f0ff";
      color.donutColor = "#608dff";
      color.textColor = "#1d4a7a";
    } else if (rank === "B") {
      title = "B등급 인증서를 받을 수 있어요 🙂";
      color.boxColor = "#F4FADB";
      color.donutColor = "#C5E384";
      color.textColor = "#658332";
    }
  } else {
    // rank == null 일 때
    title = "인증서 정보를 불러오지 못했어요 🤧";
    safetyRank = false;
    facilityRank = false;
  }

  return (
    <div className="main-box" style={{ backgroundColor: color.boxColor }}>
      <div>
        <div
          className="donut-outer"
          style={{ backgroundColor: color.donutColor }}
        >
          <div
            className="donut-inner"
            style={{ backgroundColor: color.boxColor, color: color.textColor }}
          >
            {rank ?? "-"}
          </div>
        </div>
      </div>
      <div style={{ color: color.textColor }}>
        <h2>{title}</h2>
        <div>
          <h3>
            {safetyRank ? "✔️" : "✖️"} 안전 등급{" "}
            {safetyRank == null
              ? "로딩 중..."
              : safetyRank == true
              ? "충족"
              : "미충족"}
          </h3>
          <h3>
            {facilityRank ? "✔️" : "✖️"} 설비 등급{" "}
            {facilityRank == null
              ? "로딩 중..."
              : facilityRank === true
              ? "충족"
              : "미충족"}
          </h3>
        </div>
      </div>
    </div>
  );
}
