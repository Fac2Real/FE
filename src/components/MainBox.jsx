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
          fontSize="2rem"
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
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default function MainBox() {
  const [rank, setRank] = useState("");
  const [showLabel, setShowLabel] = useState(false);
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
      <div className="donut-box">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={0}
              activeShape={(props) =>
                renderActiveShape({ ...props, showLabel })
              }
              data={[{ name: rank ? rank : "-", value: 1 }]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={-270}
              endAngle={90}
              fill={color.donutColor}
              dataKey="value"
              onAnimationEnd={() => setShowLabel(true)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ color: color.textColor }}>
        <h2>{title}</h2>
        <div>
          <h3>
            {safetyRank ? "✔️" : "✖️"} 안전 등급{" "}
            {safetyRank == null ? "로딩 중..." : safetyRank ? "충족" : "미충족"}
          </h3>
          <h3>
            {facilityRank ? "✔️" : "✖️"} 설비 등급{" "}
            {facilityRank == null
              ? "로딩 중..."
              : facilityRank
              ? "충족"
              : "미충족"}
          </h3>
        </div>
      </div>
    </div>
  );
}
