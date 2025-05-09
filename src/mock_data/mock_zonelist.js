/* mock data */
const mockZoneList = [
    {
        title: "보일러실",
        env_sensor: [
            { name: "온도 센서", thres: 60 },
            { name: "습도 센서", thres: 75 },
        ],
        fac_sensor: [],
        master: "김00",
        level: 2,
    },
    {
        title: "휴게실",
        env_sensor: [],
        fac_sensor: ["진동 센서"],
        master: "윤00",
        level: 0
    },
    { title: "테스트룸A", env_sensor: [], fac_sensor: [], master: "정00", level: 1 },
    { title: "테스트룸B", env_sensor: [], fac_sensor: [], master: "강00", level: 1 },
    { title: "테스트룸C", env_sensor: [], fac_sensor: [], master: "이00", level: 0 },
    { title: "테스트룸D", env_sensor: [], fac_sensor: [], master: "박00", level: 0 },
    { title: "테스트룸D", env_sensor: [], fac_sensor: [], master: "박00", level: 0 },
];


export default mockZoneList;