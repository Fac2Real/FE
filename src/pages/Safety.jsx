export default function Safety() {
  const mock_workers = {
    normal_workers: [],
    abnormal_workers: [],
    disconnected_workers: [], // 논의필요!
  };
  return (
    <>
      <h1>작업자 안전관리</h1>
      {/* 정상 작업자 */}
      <div className="box-wrapper">
        <div className="top-box" style={{ backgroundColor: "#D9FFD0" }}>
          정상
        </div>
        <div className="bottom-box">
          {/* 작업자 목록
           * 아니 뭐더라 */}
        </div>
      </div>
      {/* 이상 작업자 */}
      <div className="box-wrapper">
        <div className="top-box" style={{ backgroundColor: "#FFEBCE" }}>
          주의
        </div>
        <div className="bottom-box">
          {/* 작업자 목록
           * 아니 뭐더라 */}
        </div>
      </div>
      {/* 연결되지 않은 작업자 */}
      <div className="box-wrapper">
        <div className="top-box" style={{ backgroundColor: "#DADADA" }}>
          연결되지 않은 사용자
        </div>
        <div className="bottom-box"></div>
      </div>
    </>
  );
}
