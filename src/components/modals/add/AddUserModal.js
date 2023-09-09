import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Upload,
  Icon,
  message,
} from "antd";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  openNotificationError,
  openNotificationSuccess,
} from "../../../helpers/Notifications";

import AddUserApi from "../../../api/User/AddUserApi";

const { TextArea } = Input;
const { Option } = Select;

function AddSeekerModal(props) {
  const [submit, setSubmit] = useState(false);

  const [form] = Form.useForm();


  useEffect(() => {
    if (props.visible) {

    }
  }, [props.visible]);

  function handleCancel() {
    setSubmit(false);

    props.handleCancel();
    form.resetFields();
  }



  async function onFinish(values) {
    setSubmit(true);
    const apiResponse = await AddUserApi(
      values.name,
        values.username,
        values.password,
        values.role,

    );
    if (apiResponse.status === 400 || apiResponse.status === 500 ) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.status === 200 ) {
      openNotificationSuccess("bottomRight", apiResponse.message);
      props.handleOk();
    } else {
      openNotificationError(
        "bottomRight",
        "Couldn't add item try again later."
      );
    }
    handleCancel();

  }

  const roles = ["ADMIN", "CONSULTANT", "USER"];





  return (
    <Modal
      title="Add User"
      open={props.visible}
      onCancel={() => handleCancel()}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="addItem"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        form={form}
      >
        <Form.Item
            label="Name:"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter  name!",
              },
            ]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter  username!",
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
                message: "Please enter Address!",
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
                "Add User"
              )}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddSeekerModal;
