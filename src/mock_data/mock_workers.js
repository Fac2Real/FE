
export const mock_workers = [
    {
        name: "S00",
        status: "위험",
        workerId: "WEARABLE000111000",
        email: "test@example.com",
        phoneNumber: "01022222222",
    },
    {
        name: "Y00",
        status: "정상",
        workerId: "인식되지 않음",
        email: "test@example.com",
        phoneNumber: "01033333333",
    },
    {
        name: "J00",
        status: "정상",
        workerId: "WEARABLE111111111",
        email: "test@example.com",
        phoneNumber: "01011112222",
    },
];

export const mock_loglist = [
    {
        zoneId: "zone123",
        targetType: "환경",
        sensorType: "TEMPERATURE",
        dangerLevel: 2,
        value: 35.5,
        timestamp: "2024-03-20T14:30:00",
        abnormalType: "온도 위험",
        targetId: "sensor456",
    },
    {
        zoneId: "zone123",
        targetType: "환경",
        sensorType: "TEMPERATURE",
        dangerLevel: 1,
        value: 35.5,
        timestamp: "2024-03-20T14:30:00",
        abnormalType: "온도 위험",
        targetId: "sensor456",
    },
    {
        zoneId: "zone123",
        targetType: "환경",
        sensorType: "TEMPERATURE",
        dangerLevel: 0,
        value: 35.5,
        timestamp: "2024-03-20T14:30:00",
        abnormalType: "온도 안정",
        targetId: "sensor456",
    },
];

export const mock_manager = {
    workerId: "22220000",
    name: "홍길동",
    phoneNumber: "010-1234-5678",
    email: "honggildong@example.com",
    zoneId: "ZONE001",
    zone: "포장 구역 A",
    status: "정상",
};