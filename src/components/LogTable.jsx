import { useRef } from "react";

export default function LogTable({ logs, onScrollEnd, scrollBoxRef }) {
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      onScrollEnd();
    }
  };
  return (
    <div
      ref={scrollBoxRef}
      style={{ maxHeight: "40vh", overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr className="table-header">
              <th style={{ width: "1%" }}>분류</th>
              <th style={{ width: "6%" }}>세분류</th>
              {/* <th style={{ width: "2%" }}>위험도</th> */}
              <th style={{ width: "3%" }}>발생 시각</th>
              <th style={{ width: "4%" }}>센서ID</th>
              <th style={{ width: "2%" }}>측정값</th>
            </tr>
          </thead>
          <tbody>
            {!logs?.length && (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "0.5rem" }}
                >
                  로그가 없습니다
                </td>
              </tr>
            )}
            {logs?.map((l, i) => {
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
    </div>
  );
}
