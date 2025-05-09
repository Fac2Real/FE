import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import { AlarmEvent, RiskLevel } from "../types/AlarmEvent";
import useWebSocket from "../websocket/useWebSocket";

type ToastContextType = {
  showToast: (alarm: AlarmEvent) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        return "bg-red-600 text-white";
      case "WARNING":
        return "bg-yellow-400 text-black";
      case "INFO":
      default:
        return "bg-blue-500 text-white";
    }
  };

  useWebSocket("/topic/alarm",(message: AlarmEvent) => {
    console.log("Received message:", message);

    showToast(message);
  })

  // useEffect(() => {
  //   const handleWebSocketMessage = (event: MessageEvent) => {
  //     const data = JSON.parse(event.data) as AlarmEvent;
  //     console.log("WebSocket message received:", data);
  //     showToast(data);
  //   }
  // }, []);
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {ReactDOM.createPortal(
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.eventId}
              onClick={() => removeToast(toast.eventId)}
              className={`px-4 py-3 rounded shadow-md cursor-pointer transition-all animate-fade-in ${getColor(toast.riskLevel)}`}
            >
              <div className="font-bold">
                {toast.riskLevel} - {toast.sensorType}
              </div>
              <div>{toast.messageBody}</div>
              <div className="text-xs opacity-75">
                {new Date(toast.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>,
        document.getElementById("toast-root") as HTMLElement
      )}
      
    </ToastContext.Provider>
  );
};
