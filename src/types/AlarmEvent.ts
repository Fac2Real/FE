// backend에서 전달되는 AlarmEvent의 타입
export type RiskLevel = "INFO" | "WARNING" | "CRITICAL";

export interface AlarmEvent {
  eventId: string;
  sensorType: string;
  sensorValue: number;
  riskLevel: RiskLevel;
  timestamp: string;
  messageBody: string;
  source: string;
}