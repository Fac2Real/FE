export default function Equip() {
  const equips = [];
  return (
    <>
      <div className="sensorlist">
        <div className="sensorlist-underbar">설비 목록</div>
        {equips.length === 0 && <p>등록된 설비가 없습니다</p>}
      </div>
      <div className="sensorlist">
        <div className="sensorlist-underbar">설비 예측</div>
        {equips.length === 0 && <p>등록된 설비가 없습니다</p>}
      </div>
    </>
  );
}
