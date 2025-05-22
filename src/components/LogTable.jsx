export default function LogTable({ logs }) {
  return (
    <>
      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr className="table-header">
              <th style={{ width: "1%" }}>분류</th>
              <th style={{ width: "6%" }}>세분류</th>
              {/* <th style={{ width: "2%" }}>위험도</th> */}
              <th style={{ width: "5%" }}>발생 시각</th>
              <th style={{ width: "2%" }}>센서ID</th>
              <th style={{ width: "2%" }}>측정값</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, i) => {
              return (
                <tr
                  key={i}
                  className={
                    l.dangerLevel == 2
                      ? "critical"
                      : l.dangerLevel == 1
                      ? "warning"
                      : ""
                  }
                >
                  <td>{l.targetType}</td>
                  <td>{l.abnormalType}</td>
                  {/* <td>{l.dangerLevel}</td> */}
                  <td>{l.timestamp}</td>
                  <td>{l.targetId}</td>
                  <td>{l.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
