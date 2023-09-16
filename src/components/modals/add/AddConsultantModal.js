import { Button, Form, Input, Modal, Select, Spin } from "antd";
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../../helpers/Notifications";
import AddConsultantApi from "../../../api/Consultant/AddConsultantApi";
import { useSelector } from "react-redux";

function AddConsultantModal(props) {
  const [submit, setSubmit] = useState(false);
  const businessState = useSelector((state) => state.businessState.value);
  const { Option } = Select;

  function handleCancel() {
    setSubmit(false);
    props.handleCancel();
  }

  async function onFinish(values) {
    setSubmit(true);
    const apiResponse = await AddConsultantApi(
        values.job_type,
        values.country,
        values.name,
        values.username,
        values.password,
        values.role

    );
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      openNotificationSuccess("bottomRight", apiResponse.message);
      props.handleOk();
    } else {
      openNotificationSuccess(
        "bottomRight",
        "Consultant Successfully Registered!."
      );
    }
    handleCancel();
  }
  const roles = ["CONSULTANT"];

  return (
    <Modal
      title="Add new Consultant"
      open={props.visible}
      onCancel={() => handleCancel()}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="addConsultant"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
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
            label="Email:"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter  Email!",
              },
            ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
        >
          <Input  />
        </Form.Item>



        <Form.Item
            label="Role :"
            name="role"
            initialValue={"CONSULTANT"}
            rules={[
              {
                required: true,
                message: "Please enter role!",
              },
            ]}
        >
          <Select
              allowClear
              showSearch
              placeholder="Select position"
              optionFilterProp="children"
          >
            {roles.map((position) => {
              return (
                  <Option key={position} value={position}>
                    {position}
                  </Option>
              );
            })}
          </Select>
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
                "Add Consultant"
              )}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddConsultantModal;
