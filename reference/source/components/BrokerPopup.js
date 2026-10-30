import React from "react";
import { Modal } from "flowbite-react";

const BrokerPopup = ({
  isShowModal,
  setIsShowModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  size,
  bodyStyle="dark:bg-white"
}) => {
  return (
    <Modal
      show={isShowModal}
      onClose={(e) => {setIsShowModal(false)}}
      size={size}
    >
      {isShowModal ? (
        ModalContent ? (
          ModalContent
        ) : (
          <>
            {ModalHeader ? <Modal.Header className="px-4 pt-4 pb-0 font-medium text-[18px] dark:border-gray dark:bg-white text-black">{ModalHeader}</Modal.Header> : ""}
            {ModalBody ? <Modal.Body className={bodyStyle}>{ModalBody}</Modal.Body> : ""}
            {ModalFooter ? <Modal.Footer>{ModalFooter}</Modal.Footer> : <></>}
          </>
        )
      ) : (
        <div></div>
      )}
    </Modal>
  );
};

export default BrokerPopup;
