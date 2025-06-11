import TempIcon from "../assets/temp_icon.svg?react";
import HumidIcon from "../assets/humid_icon.svg?react";
import CheckedIcon from "../assets/checked_icon.svg?react";
import GasIcon from "../assets/monitor_icons/gas_icon.svg?react";
import ElectricIcon from "../assets/monitor_icons/electric_icon.svg?react";
import PressureIcon from "../assets/monitor_icons/pressure_icon.svg?react";
import VibIcon from "../assets/monitor_icons/vib_icon.svg?react";

export default function MonitorIcon({
  abnormal_sensor = "온도",
  level,
  color,
  isAlarm = true,
}) {
  let iconWidth = "5rem";
  if (!isAlarm) {
    iconWidth = "25%";
  }
  if (!color) {
    color = level == 0 ? "#1d4a7a" : level == 1 ? "orange" : "red";
  }

  if (level == 0) {
    return <CheckedIcon width={iconWidth} color={color} opacity="0.5" />;
  }

  if (abnormal_sensor.includes("온도") || abnormal_sensor.includes("temp")) {
    return <TempIcon width={iconWidth} color={color} opacity="0.5" />;
  }
  if (abnormal_sensor.includes("습도") || abnormal_sensor.includes("humid")) {
    return <HumidIcon width={iconWidth} color={color} opacity="0.4" />;
  }
  if (
    abnormal_sensor.includes("진동") ||
    abnormal_sensor.includes("vibration")
  ) {
    return <VibIcon width={iconWidth} color={color} opacity="0.4" />;
  }
  if (
    abnormal_sensor.includes("압력") ||
    abnormal_sensor.includes("pressure")
  ) {
    return <PressureIcon width={iconWidth} color={color} opacity="0.4" />;
  }
  if (
    abnormal_sensor.includes("전력") ||
    abnormal_sensor.includes("power") ||
    abnormal_sensor.includes("전류") ||
    abnormal_sensor.includes("current")
  ) {
    return <ElectricIcon width={iconWidth} color={color} opacity="0.4" />;
  }
  if (
    abnormal_sensor.includes("voc") ||
    abnormal_sensor.includes("휘발성유기화합물") ||
    abnormal_sensor.includes("dust") ||
    abnormal_sensor.includes("먼지")
  ) {
    return <GasIcon width={iconWidth} color={color} opacity="0.4" />;
  }
}
