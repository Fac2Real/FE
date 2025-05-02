import ArrowIcon from "../assets/arrow_icon.svg?react";

export default function MiniBox({ title, icon }) {
  return (
    <div className="mini-box moving-box">
      <p>{title}</p>
      <div>
        <ArrowIcon width="2.5rem" />
        {icon}
      </div>
    </div>
  );
}
