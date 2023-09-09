import { Button, Modal, Spin } from "antd";
import React, { useState } from "react";

function ConfirmationModal(props) {
  const [submit, setSubmit] = useState(false);

  function handleCancel() {
    setSubmit(false);
    props.handleCancel();
  }

  return (
    <Modal
      title={props.title}
      open={props.visible}
      onCancel={() => handleCancel()}
      footer={null}
    >
      <div className="mb-6">{props.text}</div>

      <div className=" flex justify-end">
        <Button className="mr-3 w-20" onClick={() => handleCancel()}>
          No
        </Button>
        <Button
          className="w-20"
          type="primary"
          htmlType={submit}
          onClick={props.handleOk}
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
