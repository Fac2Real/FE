import MiniMonitor from "../MiniMonitor";

export default function SensorList() {
  const roomList = [
    {
      title: "보일러실",
      env: [
        { name: "온도 센서", thres: 60 },
        { name: "습도 센서", thres: 75 },
      ],
      fac: [],
      master: "김00",
    },
    { title: "휴게실", env: [], fac: [], master: "윤00" },
    { title: "테스트룸A", env: [], fac: [], master: "정00" },
  ];

  return (
    <>
      <h2>기기 목록</h2>
      <div className="page-contents">
        <div className="rows">
          {roomList.map((room, idx) => (
            <table className="table-1" key={idx}>
              <thead>
                <tr>
                  <th>{room.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="sensorlist-info">
                    <div>
                      <div className="sensorlist-underbar">공간 환경 센서</div>
                      {room.env.length == 0 && <p>공간 환경 센서가 없습니다</p>}
                      {room.env.length !== 0 &&
                        room.env.map((sen, idx) => (
                          <p key={idx}>
                            {sen.name} (현재 설정값: {sen.thres})
                          </p>
                        ))}
                    </div>
                    <div>
                      <div className="sensorlist-underbar">설비 관리 센서</div>
                      {room.fac.length == 0 && <p>설비 관리 센서가 없습니다</p>}
                      {room.fac.length > 0 && room.fac}
                    </div>
                    <div>
                      <div className="sensorlist-underbar">담당자</div>
                      {!room.master && <p>담당자가 없습니다</p>}
                      {room.master && <p>{room.master}</p>}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        <MiniMonitor />
      </div>
    </>
  );
}
