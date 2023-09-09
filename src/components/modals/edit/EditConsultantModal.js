import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import EditConsultantNameApi from "../../../api/Consultant/EditConsultantNameApi";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../../helpers/Notifications";

function EditConsultantModal(props) {
  const [submit, setSubmit] = useState(false);

  function handleCancel() {
    setSubmit(false);
    props.handleCancel();
  }

  async function onFinish(value) {
    setSubmit(true);
    const apiResponse = await EditConsultantNameApi(props.data?.id, value.name);
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      openNotificationSuccess(
        "bottomRight",
        "Consultant name successfully changed"
      );
      props.handleOk();
    } else {
      openNotificationError(
        "bottomRight",
        "Couldn't edit Consultant name. Try again later."
      );
    }
    handleCancel();
  }

  return (
    <Modal
      title="Edit Consultant"
      open={props.visible}
      onCancel={() => handleCancel()}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="editConsultant"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        initialValues={{ name: props.data?.name }}
      >
        <Form.Item
            label="Name :"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter Consultant name!",
              },
            ]}
        >
          <Input placeholder="Consultant name" />
        </Form.Item>

        <Form.Item
            label="Job Type :"
            name="job_type"
            rules={[
              {
                required: true,
                message: "Please enter Consultant Job Type!",
              },
            ]}
        >
          <Input placeholder="Consultant Job Type" />
        </Form.Item>

        <Form.Item
            label="Job Country :"
            name="country"
            rules={[
              {
                required: true,
                message: "Please enter Consultant country!",
              },
            ]}
        >
          <Input placeholder="Consultant country" />
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

export default EditConsultantModal;
