import XIcon from "../assets/x_icon.svg?react";

export default function Modal({ isOpen, onClose }) {
  if (isOpen) {
    return (
      <>
        <div className="modal-overlay">
          <div className="modal-box">
            <div onClick={onClose}>
              <XIcon width="1.5rem" height="1.5rem" />
            </div>
            <div className="modal-contents">
              <span>[보일러실]의 [환경-온도 센서] 임계값 변경</span>
              <div className="input-flex">
                <lable>센서 임계값</lable>
                <input type="number"></input>
              </div>
              <div className="button-flex">
                <button>수정</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
