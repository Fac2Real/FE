import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Zonedetail() {
  const { zoneId } = useParams();
  const { state } = useLocation();
  const zoneName = state?.zoneName;

  // 1) 모든 useState/useRef
  const [dashboards, setDashboards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogOpen, setLogOpen] = useState(false);
  const bottomRef = useRef(null);

  // 2) 모든 useEffect (조건 없이 항상 선언)
  useEffect(() => {
    setLoading(true);
    const url =
      import.meta.env.VITE_BACKEND_URL +
      `/api/grafana-zone/${zoneId}/dashboards`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDashboards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [zoneId]);

  useEffect(() => {
    if (isLogOpen && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 200); // transition 후 약간의 시간 대기 (300ms)
    }
  }, [isLogOpen]);

  // 3) 조건부 렌더링
  if (loading) return <div>로딩 중…</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <h1>{zoneName}</h1>
      {/* 환경 리포트 부분 :: Grafana by InfluxDB */}
      <div className="box-wrapper">
        <div className="top-box">환경 리포트</div>
        <div className="bottom-box">
          <div className="grafana-wrapper">
            {dashboards?.map(({ sensorId, sensorType, iframeUrl }) => (
              <div key={sensorId} className="grafana-box">
                <p>
                  {sensorType} 센서 ({sensorId})
                </p>
                <div>
                  <iframe
                    src={iframeUrl}
                    title={`grafana-${sensorId}`}
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 근무자 현황 :: 스프린트2 */}
      <div className="box-wrapper">
        <div className="top-box">근무자 현황</div>
        <div className="bottom-box">
          <p>스프린트2에서 진행 예정</p>
        </div>
      </div>
      {/* 설비 현황 :: 스프린트3 */}
      <div className="box-wrapper">
        <div className="top-box">설비 현황</div>
        <div className="bottom-box">
          <p>스프린트3에서 진행 예정</p>
        </div>
      </div>
      {/* 시스템 로그 조회 :: 토글해야 호출! */}
      <div className="box-wrapper">
        <div className="top-box">
          시스템 로그 조회
          <span className="arrow" onClick={() => setLogOpen((prev) => !prev)}>
            {isLogOpen ? "▲" : "▼"}
          </span>
        </div>
        <div className={`bottom-box last-box ${isLogOpen ? "open" : "closed"}`}>
          <p>logs</p>
          <p>logs</p>
          <p>logs</p>
          <p>logs</p>
          <p>logs</p>
        </div>
        {/* <div ref={bottomRef}>스크롤 위치 조정용</div> */}
      </div>
      <div ref={bottomRef} style={{ height: 0 }}></div>
    </>
  );
}
