import { isValidElement } from "react";
import XIcon from "../../assets/x_icon.svg?react";
import BasicModal from "./BasicModal";

const formattedPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("+82")) {
    return phoneNumber;
  } else {
    return "+82" + phoneNumber.slice(-10);
  }
};

function ContactTable({ workerInfo }) {
  const { email, phoneNumber, workerId, isManager } = workerInfo;
  return (
    <div className="table-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>사번</th>
            <td>{workerId}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">휴대폰 번호</th>
            <td>{formattedPhoneNumber(phoneNumber)}</td>
          </tr>
          <tr>
            <th scope="row">이메일</th>
            <td>{email}</td>
          </tr>
          <tr>
            <th scope="row">담당자 여부</th>
            <td>{isManager ? "예" : "아니오"}</td>
          </tr>
        </tbody>
      </table>
      <br></br>
    </div>
  );
}

export default function WorkerInfoModal({ isOpen, onClose, workerInfo }) {
  console.log(workerInfo);
  if (isOpen) {
    return (
      <BasicModal
        onClose={onClose}
        type="edit"
        modal_contents={{
          title: `[${workerInfo.name}]의 정보`,
          contents: <ContactTable workerInfo={workerInfo} />,
        }}
      />
    );
  }
  return <></>;
}
