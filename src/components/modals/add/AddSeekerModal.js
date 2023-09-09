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
import AddSeekerApi from "../../../api/Seekers/AddSeekerApi";

const { TextArea } = Input;
const { Option } = Select;

function AddSeekerModal(props) {
  const [submit, setSubmit] = useState(false);
  const [category, setCategory] = useState();
  const [menuItemsCount, setMenuItemsCount] = useState();
  const [form] = Form.useForm();
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    if (props.visible) {
      // getCategory();
    }
  }, [props.visible]);

  function handleCancel() {
    setSubmit(false);
    // selectCategory();
    props.handleCancel();
    form.resetFields();
  }



  async function onFinish(values) {
    setSubmit(true);
    const apiResponse = await AddSeekerApi(
      values.name,
        values.address,
        values.gender,
        values.phone,
        values.country,
        values.job_type,
        values.email,
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





  return (
    <Modal
      title="Add Seeker"
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
            label="Address:"
            name="address"
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
            label="Country:"
            name="country"
            rules={[
              {
                required: true,
                message: "Please enter Country!",
              },
            ]}
        >
          <Input  />
        </Form.Item>

        <Form.Item
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter Email!",
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            label="Gender:"
            name="Gender"
            rules={[
              {
                required: true,
                message: "Please enter Gender!",
              },
            ]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
            label="Job Type:"
            name="job_type"
            rules={[
              {
                required: true,
                message: "Please enter Job Type!",
              },
            ]}
        >
          <Input  />
        </Form.Item>

        <Form.Item
            label="Phone:"
            name="Phone"
            rules={[
              {
                required: true,
                message: "Please enter Phone!",
              },
            ]}
        >
          <Input  />
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
                "Add seeker"
              )}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddSeekerModal;
