import TempIcon from "../assets/temp_icon.svg?react";
import HumidIcon from "../assets/humid_icon.svg?react";

export default function MonitorIcon({ abnormal_sensor = "온도", level }) {
  const color = level == 0 ? "gray" : level == 1 ? "orange" : "red";

  if (abnormal_sensor.includes("온도")) {
    return <TempIcon width="5rem" color={color} opacity="0.4" />;
  }
  if (abnormal_sensor.includes("습도")) {
    return <HumidIcon width="5rem" color={color} opacity="0.4" />;
  }
}
