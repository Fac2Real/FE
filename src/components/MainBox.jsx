import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    showLabel,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {showLabel && (
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fill}
          fontSize="1rem"
          fontWeight="bold"
          style={{
            opacity: showLabel ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {payload.name}
        </text>
      )}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 3}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
    </g>
  );
};

function Donut({ rank, color }) {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <div className="donut-box">
      <h3>안전</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={0}
            activeShape={(props) => renderActiveShape({ ...props, showLabel })}
            data={[{ name: rank ? rank : "loading...", value: 1 }]}
            cx="50%"
            cy="50%"
            innerRadius={"70%"} // keep: 50
            outerRadius={"95%"} // keep: 75
            startAngle={-270}
            endAngle={90}
            fill={color.donutColor}
            dataKey="value"
            onAnimationEnd={() => setShowLabel(true)}
          />
        </PieChart>
      </ResponsiveContainer>
      <p>발생 건수： ＸＸ건</p>
    </div>
  );
}

export default function MainBox() {
  const [rank, setRank] = useState("");
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
    title = "인증서 정보를 불러오지 못했어요 🤧";
    safetyRank = false;
    facilityRank = false;
    color.boxColor = "var(--box-color)";
    color.donutColor = "#afafaf";
    color.textColor = "#5f5f5f";
  }

  return (
    <div className="main-box" style={{ backgroundColor: color.boxColor }}>
      <h2>2025년 04월 [공장명] 리포트 요약</h2>
      <p>반영 기간: 2025.04.01 ~ 2025.04.30</p>
      <div className="donut-wrapper">
        <Donut rank={rank} color={color} />
        <Donut rank={rank} color={color} />
        <Donut rank={rank} color={color} />
      </div>
    </div>
  );
}
