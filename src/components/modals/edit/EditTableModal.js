import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import EditTableApi from "../../../api/Tables/EditTableApi";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../../helpers/Notifications";

function EditTableModal(props) {
  const [submit, setSubmit] = useState(false);

  function handleCancel() {
    setSubmit(false);
    props.handleCancel();
  }

  async function onFinish(value) {
    setSubmit(true);
    const apiResponse = await EditTableApi(
      props.data?.id,
      value.name,
      value.seats
    );
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      openNotificationSuccess(
        "bottomRight",
        "Table details successfully changed"
      );
      props.handleOk();
    } else {
      openNotificationError(
        "bottomRight",
        "Couldn't edit table. Try again later."
      );
    }
    handleCancel();
  }

  return (
    <Modal
      title="Edit Table"
      open={props.visible}
      onCancel={() => handleCancel()}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="editTable"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        initialValues={{ name: props.data?.name, seats: props.data?.seats }}
      >
        <Form.Item
          label="Name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter table name!",
            },
          ]}
        >
          <Input placeholder="Table name" />
        </Form.Item>

        <Form.Item
          label="Seats:"
          name="seats"
          rules={[
            {
              required: true,
              message: "Please enter seats count!",
            },
          ]}
        >
          <Input placeholder="Seats" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div className=" flex justify-end">
            <Button className="mr-3 w-28" onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button
              className="w-40"
              type="primary"
              htmlType={submit && "submit"}
            >
              {submit ? (
                <Spin
                  size="small"
                  indicator={<LoadingOutlined style={{ color: "#fff" }} spin />}
                />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditTableModal;
