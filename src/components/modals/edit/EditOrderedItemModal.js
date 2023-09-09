import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import {
  LoadingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

function EditOrderedItemModal(props) {
  const [submit, setSubmit] = useState(false);

  function handleCancel() {
    setSubmit(false);
    props.handleCancel();
  }
  return (
    <Modal
      title="Edit Order"
      open={props.visible}
      onCancel={() => handleCancel()}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="editOrderedItem"
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Item:"
          name="item"
          initialValue="Chicken & sweet corn"
          rules={[
            {
              required: true,
              message: "Please enter item name!",
            },
          ]}
        >
          <Input placeholder="Item name" />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex items-center justify-between ">
              <div>Ordered By:</div>
              <div className="flex place-self-end items-center gap-2 ml-10 w-fit">
                <div>Quantity:</div>
                <div>2</div>
              </div>
            </div>
          }
          name="quantity"
        >
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div>Tim Cook</div>
              <div className="flex items-center gap-2">
                <PlusCircleOutlined className="cursor-pointer" />
                <div>1</div>
                <MinusCircleOutlined className="cursor-pointer" />
                <DeleteOutlined className="text-red-500 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Steve Jobs</div>
              <div className="flex items-center gap-2">
                <PlusCircleOutlined className="cursor-pointer" />
                <div>1</div>
                <MinusCircleOutlined className="cursor-pointer" />
                <DeleteOutlined className="text-red-500 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>
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

export default EditOrderedItemModal;
