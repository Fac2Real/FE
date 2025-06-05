function SummaryBox({ title, count }) {
  const box_color =
    title == "전체"
      ? "var(--blue)"
      : `${title == "경고" ? "var(--warning3)" : "orangered"}`;
  return (
    <div
      className="summarybox"
      style={{
        color: box_color,
      }}
    >
      <h3>{title}</h3>
      <p>{count} 건</p>
    </div>
  );
}

export default function GeneralReport({ report }) {
  return (
    <>
      <div>
        {/* <h2>발생 건수 요약</h2> */}
        <div className="summarybox-flex">
          <SummaryBox title="전체" count={0} />
          <SummaryBox title="경고" count={0} />
          <SummaryBox title="위험" count={0} />
        </div>
      </div>
      <div className="box-wrapper">
        <div className="top-box">문제가 가장 많이 발생한 유형</div>
        <div className="bottom-box">ddddd</div>
      </div>
      <div className="box-wrapper">
        <div className="top-box">문제가 가장 많이 발생한 날짜</div>
        <div className="bottom-box">ddddd</div>
      </div>
      <div className="box-wrapper">
        <div className="top-box">문제가 가장 많이 발생한 구역</div>
        <div className="bottom-box">ddddd</div>
      </div>
    </>
  );
}
