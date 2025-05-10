import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import { AlarmEvent, RiskLevel } from "../types/AlarmEvent";
import useWebSocket from "../websocket/useWebSocket";

type ToastContextType = {
  showToast: (alarm: AlarmEvent) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<AlarmEvent[]>([]);

  const showToast = (alarm: AlarmEvent) => {
    setToasts((prev) => [...prev, alarm]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.eventId !== alarm.eventId));
    }, 10000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.eventId !== id));
  };

  const getColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case "CRITICAL":
        return "alert-box red";
      case "WARNING":
        return "alert-box yellow";
      case "INFO":
      default:
        return "alert-box blue";
    }
  };

  useWebSocket("/topic/alarm", (message: AlarmEvent) => {
    console.log("Received message:", message);

    showToast(message);
  });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {ReactDOM.createPortal(
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.eventId}
              onClick={() => removeToast(toast.eventId)}
              className={getColor(toast.riskLevel)}
            >
              <h3>
                {toast.riskLevel} - {toast.sensorType}
              </h3>
              <div>
                <p>{toast.messageBody}</p>
                <p>{new Date(toast.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>,
        document.getElementById("toast-root") as HTMLElement
      )}
    </ToastContext.Provider>
  );
};
