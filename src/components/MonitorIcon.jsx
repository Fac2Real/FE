import TempIcon from "../assets/temp_icon.svg?react";
import HumidIcon from "../assets/humid_icon.svg?react";
import CheckedIcon from "../assets/checked_icon.svg?react";

export default function MonitorIcon({
  abnormal_sensor = "온도",
  level,
  color,
}) {
  if (!color) {
    color = level == 0 ? "#1d4a7a" : level == 1 ? "orange" : "red";
  }

  if (level == 0) {
    return <CheckedIcon width="5rem" color={color} opacity="0.5" />;
  }

  if (abnormal_sensor.includes("온도") || abnormal_sensor.includes("temp")) {
    return <TempIcon width="5rem" color={color} opacity="0.5" />;
  }
  if (abnormal_sensor.includes("습도") || abnormal_sensor.includes("humid")) {
    return <HumidIcon width="5rem" color={color} opacity="0.4" />;
  }
}
