import React from "react";
import { Modal } from "flowbite-react";

const PopUp = ({
  isShowModal,
  setIsShowModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  size,
  bodyStyle=""
}) => {
  return (
    <Modal
      className="md:h-auto"
      show={isShowModal}
      onClose={(e) => {setIsShowModal(false)}}
      size={size ?? "2xl"}
      popup
    >
      {isShowModal ? (
        ModalContent ? (
          ModalContent
        ) : (
          <>
            {ModalHeader ? <Modal.Header className="pt-4 pl-6 pr-4 font-medium text-[18px] text-black">{ModalHeader}</Modal.Header> : ""}
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

export default PopUp;
