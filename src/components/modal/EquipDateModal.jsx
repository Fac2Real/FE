import { useState } from "react";
import XIcon from "../../assets/x_icon.svg?react";
export default function EquipDateModal({
  isOpen,
  onClose,
  equipInfo,
  onUpdate,
}) {
  const [newDate, setNewDate] = useState();
  if (isOpen) {
    console.log("====================");
    console.log(newDate);
    console.log(equipInfo);
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div onClick={onClose}>
            <XIcon width="1.5rem" height="1.5rem" />
          </div>
          <div className="modal-contents" style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: "1.5rem" }}>
              [{equipInfo.equipName}] 교체일자 업데이트
            </p>
            <div className="input-flex">
              {/* <span>최근 교체 일자</span> */}
              <input
                style={{ textAlign: "center" }}
                type="date"
                value={newDate}
                onChange={(e) => {
                  setNewDate(e.target.value);
                }}
              ></input>
            </div>
            <div className="button-flex">
              <button
                onClick={() => {
                  onUpdate(newDate, equipInfo);
                  onClose();
                }}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
