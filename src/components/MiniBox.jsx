import ArrowIcon from "../assets/arrow_icon.svg?react";
import ArrowIcon2 from "../assets/arrow_icon2.svg?react";

export default function MiniBox({ title, icon }) {
  return (
    <div className="mini-box moving-box click-box">
      <p>{title}</p>
      <div>
        <ArrowIcon2 width="4.5rem" />
        {icon}
      </div>
    </div>
  );
}
