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
            <table key={idx}>
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
                      {room.env.length == 0 && (
                        <div key={idx} className="list-text">
                          <div>공간 환경 센서가 없습니다</div>
                        </div>
                      )}
                      {room.env.length !== 0 &&
                        room.env.map((sen, idx) => (
                          <div key={idx} className="list-text">
                            <div>{sen.name}</div>
                            <span className="dash-line"></span>
                            <div>(현재 설정값: {sen.thres})</div>
                          </div>
                        ))}
                    </div>
                    <div>
                      <div className="sensorlist-underbar">설비 관리 센서</div>
                      {room.fac.length == 0 && (
                        <div key={idx} className="list-text">
                          <div> 설비 관리 센서가 없습니다</div>
                        </div>
                      )}
                      {room.fac.length > 0 && room.fac}
                    </div>
                    <div>
                      <div className="sensorlist-underbar">담당자</div>
                      {!room.master && (
                        <div key={idx} className="list-text">
                          <div>담당자가 없습니다</div>
                        </div>
                      )}
                      {room.master && (
                        <div key={idx} className="list-text">
                          <div>{room.master}</div>
                          <span className="dash-line"></span>
                          <button>호출</button>
                        </div>
                      )}
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
