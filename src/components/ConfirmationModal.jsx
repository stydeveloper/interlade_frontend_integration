import React from "react";
import { Modal, Button, Spin } from "antd";
import "../styles/navbar.css";

const ConfirmationModal = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
  modalText,
}) => {
  return (
    <Modal
      title="Cancel Subscription"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered
      okButtonProps={{
        loading: confirmLoading, // Display loader when confirmLoading is true
        style: {
          borderColor: "lightgray",
          color: "black",
          transition: "border-color 0.3s",
        },
        // Add CSS class for hover effect
        className: "okButton",
      }} // Style OK button
    >
      <p>{modalText}</p>
      <style jsx>{`
        .okButton:hover {
          border-color: transparent;
        }
      `}</style>
    </Modal>
  );
};

export default ConfirmationModal;
