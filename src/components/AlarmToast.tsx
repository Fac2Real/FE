import React from "react";
import { RiskLevel } from "../types/Alarm";

type ToastProps = {
  message: string;
  riskLevel: RiskLevel;
  sensorType: string;
  timestamp: string;
  onClick?: () => void;
};

const getColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
        case 'CRITICAL':
        return 'bg-red-600';
        case 'WARNING':
        return 'bg-yellow-500 text-black';
        case 'INFO':
        default:
        return 'bg-blue-500';
    }
};

const Toast: React.FC<ToastProps> = ({ message, riskLevel, sensorType, timestamp, onClick }) => {
    const color = getColor(riskLevel);
    const formattedTime = new Date(timestamp).toLocaleTimeString();

    return (
        <div
        onClick={onClick}
        className={`${color} text-white px-4 py-3 rounded shadow-md cursor-pointer transition-all animate-fade-in`}
        >
        <div className="font-bold">{riskLevel} - {sensorType}</div>
        <div className="text-sm">{message}</div>
        <div className="text-xs text-white/80">{formattedTime}</div>
        </div>
    );
};

export default Toast;
