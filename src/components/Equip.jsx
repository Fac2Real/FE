import { useEffect, useState } from "react";
import ToolIcon from "../assets/tool_icon.svg?react";
import AlarmIcon from "../assets/alarm_icon.svg?react";
import axiosInstance from "../api/axiosInstance";
import EquipMaintainCallModal from "./modal/EquipMaintainCallModal";

function GaugeBar({ percent }) {
  console.log("percent: ", percent);
  const bgColor =
    percent >= 70 ? "#FF4D4F" : percent >= 40 ? "#FAAD14" : "#52C41A";
  return (
    <div className="gauge-bar">
      <div
        className="gauge-fill"
        style={{
          width: `${percent == 0 ? 0 : Math.max(5, percent)}%`,
          backgroundColor: bgColor,
          borderRadius: percent >= 80 ? "999px" : "999px 0 0 999px",
        }}
      ></div>
    </div>
  );
}

function EquipItem({ equip, selectEquip, openModal, workerList }) {
  const [info, setInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const test_date = "2025-06-30"; // 예상교체일자 (하드코딩!!!!)

  /* --------- 최신 정보 가져오기 --------- */
  useEffect(() => {
    if (!equip?.equipId) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await axiosInstance.get(
          `/api/equip-maintenance/latest/${equip.equipId}`,
          {
            params: { zoneId: equip.zoneId },
            signal: controller.signal,
          }
        );
        setInfo(res.data.data);
      } catch (err) {
        if (err.name !== "CanceledError") console.error(err);
      }
    })();

    return () => controller.abort();
  }, [equip.equipId, equip.zoneId]);

  // 날짜 계산 상수
  const tmp = 1000 * 60 * 60 * 24;
  const today = new Date();

  // 최근 점검 일자 (서버 → equip → 에러 메시지)
  const lastCheckDate =
    info?.lastCheckDate ||
    equip.lastCheckDate ||
    "최근 점검한 일자를 입력해주세요"; // "입력 오류" 대신 수정했습니다.

  // 예상 점검 일자 (서버 → equip.pred → 하드코딩)
  const predictedDateStr =
    info?.expectedMaintenanceDate || equip.pred || "9999-12-31";
  const predictedDate = new Date(predictedDateStr);

  // D-Day (서버 → 계산)
  const dDay =
    info?.daysUntilMaintenance ?? Math.ceil((predictedDate - today) / tmp);
  // const pred = new Date(equip.pred ? equip.pred : test_date);
  // const dDay = Math.ceil((pred - today) / tmp);

  // 퍼센트 계산
  const lastDateObj = new Date(lastCheckDate);
  let percent = 0;
  if (lastDateObj < predictedDate && lastDateObj <= today) {
    console.log("오늘", today);
    console.log("최근 점검일", lastDateObj);
    console.log("설비 점검 추론일", predictedDate);
    percent = Math.ceil(
      ((today - lastDateObj) / (predictedDate - lastDateObj)) * 100
    );
    console.log(">>> 1 ", percent);
    percent = Math.max(0, Math.min(100, percent));
  }

  console.log(">>>2 ", percent);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="sensorlist">
        <div className="sensorlist-underbar">
          <strong>{equip.equipName}</strong>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <AlarmIcon width="1.5rem" color="#000" />
          </span>
        </div>
        <div className="list-text">
          <div>예상 점검 일자</div>
          <span className="dash-line"></span>
          <span>({predictedDateStr})</span>
        </div>
        <div className="list-text">
          <div>예상 점검일까지 D-{dDay}</div>
          <GaugeBar percent={percent} />
        </div>
        <div className="list-text">
          <div>최근 점검 일자</div>
          <span className="dash-line"></span>
          <span>
            ({lastCheckDate})
            <ToolIcon
              className="thres-setting"
              width="1.3rem"
              fill="gray"
              stroke="gray"
              style={{ transform: "translateY(4px)" }}
              onClick={() => {
                selectEquip(equip);
                openModal(true);
              }}
            />
          </span>
        </div>
      </div>
      <EquipMaintainCallModal
        isOpen={isOpen}
        onClose={onClose}
        selectedEquip={equip}
        workerList={workerList}
      />
    </>
  );
}

export default function Equip({ equips, modalParam, workerList }) {
  return (
    <>
      {/* length가 1인 이유 : empty 설비 때문에... */}
      {equips?.length <= 1 && <p>등록된 설비가 없습니다</p>}
      {!(equips.length === 0) &&
        equips.map((e, i) => {
          if (e.equipName == "empty") {
            return;
          }
          return (
            <EquipItem
              key={i}
              equip={e}
              selectEquip={modalParam.setSelectedEquip}
              openModal={modalParam.openModal}
              workerList={workerList}
            />
          );
        })}
    </>
  );
}
