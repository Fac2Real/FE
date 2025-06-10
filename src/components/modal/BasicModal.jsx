import XIcon from "../../assets/x_icon.svg?react";
import YCEdit from "../../assets/img/monitory_character_edit.png";
import YCAlram from "../../assets/img/monitory_character_alram.png";
import { Link } from "react-router-dom";
import "./modal.css";
import "../../styles/table.css";

export default function BasicModal({
  onClose,
  type = "alram",
  modal_contents = {
    title: "잘못된 페이지입니다",
    contents: (
      <>
        <p>메인 화면으로 돌아가세요</p>
        <Link to="/" style={{ color: "orangered" }}>
          <strong>Click ⇀</strong>
        </Link>
        <br></br>
      </>
    ),
  },
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box-v2" onClick={(e) => e.stopPropagation()}>
        <div className="modal-box-top">
          <div className="modal-close" onClick={onClose}>
            <XIcon width="1.5rem" height="1.5rem" fill="#fff" />
          </div>
          <img
            src={type === "edit" ? YCEdit : YCAlram}
            style={{ height: type === "edit" ? "110%" : "100%" }}
          />
        </div>
        <div className="modal-box-bottom">
          <h2 style={{ fontSize: "1.25rem" }}>{modal_contents.title}</h2>
          {modal_contents.contents}
        </div>
      </div>
    </div>
  );
}
