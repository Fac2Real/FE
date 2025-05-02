import { useState } from "react";
import Modal from "../components/Modal";
import ZoneInfoBox from "../components/ZoneInfoBox";

export default function Settings() {
  const zone = [
    { name: "보일러실" },
    { name: "보일러실" },
    { name: "보일러실" },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)}>ModalTest</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <h1>센서 관리</h1>
      {zone.map((z, i) => (
        <ZoneInfoBox title={z.name} key={i} />
      ))}
      <ZoneInfoBox title="공간 추가" />
    </>
  );
}
