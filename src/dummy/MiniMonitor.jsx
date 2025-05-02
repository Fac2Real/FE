export default function MiniMonitor() {
  const roomList = ["보일러실", "휴게실", "테스트룸A", "테스트룸B", "패키징A"];
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>모니터링 현황</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room, idx) => (
            <tr key={idx}>
              <td>
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "lightgreen",
                  }}
                >
                  {room}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
