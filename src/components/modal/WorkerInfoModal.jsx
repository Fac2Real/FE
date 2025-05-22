import XIcon from "../../assets/x_icon.svg?react";

function ContactTable({ email, phone, id }) {
  return (
    <div className="table-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>이메일</th>
            <td>{email}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">휴대폰 번호</th>
            <td>{phone}</td>
          </tr>
          <tr>
            <th scope="row">웨어러블 ID</th>
            <td>{id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function WorkerInfoModal({ isOpen, onClose, workerInfo }) {
  if (isOpen) {
    console.log(workerInfo);
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div onClick={onClose}>
            <XIcon width="1.5rem" height="1.5rem" />
          </div>
          <div className="modal-contents" style={{ marginBottom: "5.5rem" }}>
            <p style={{ fontSize: "1.5rem" }}>
              {workerInfo.name}의 연락처 정보
            </p>
            <ContactTable
              email={workerInfo.email}
              phone={workerInfo.phone}
              id={workerInfo.wearableId}
            />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
