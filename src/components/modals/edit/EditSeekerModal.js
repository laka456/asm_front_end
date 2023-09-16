import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Spin,
    Upload,
    message,
} from "antd";
import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";
import {
    openNotificationError,
    openNotificationSuccess,
} from "../../../helpers/Notifications";

import EditSeekerApi from "../../../api/Seekers/EditSeekerApi";
const { Option } = Select;
const { TextArea } = Input;

function EditItemModal(props) {
    const [submit, setSubmit] = useState(false);
    const [category, setCategory] = useState();
    const [itemImage, setItemImage] = useState("");
    const [newItemImage, setNewItemImage] = useState("");

    useEffect(() => {
        // getCategory();
    }, []);

    function handleCancel() {
        setSubmit(false);
        props.handleCancel();
    }

    async function onFinish(value) {
        setSubmit(true);
        const apiResponse = await EditSeekerApi(
            props.data?.id,
            value.name,
            value.address,
            value.gender,
            value.phone,
            value.country,
            value.job_type,
            value.email,

        );


        if (apiResponse.status === 400 || apiResponse.status === 500 || apiResponse.status === 405) {
            openNotificationError("bottomRight", apiResponse.message);
        } else if (apiResponse. status === 200) {
            openNotificationSuccess(
                "bottomRight",
                " Seeker Details Changed"
            );
            props.handleOk();
        } else {
            openNotificationError(
                "bottomRight",
                "Couldn't edit . Try again later."
            );
        }
        handleCancel();
    }






    return (
        <Modal
            title="Edit Seeker"
            open={props.visible}
            onCancel={() => handleCancel()}
            footer={null}
            destroyOnClose={true}
        >
            <Form
                name="editItem"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    name: props.data?.name,
                    address: props.data?.address,
                    gender:props.data?.gender,
                    phone:props.data?.phone,
                    country:props.data?.country,
                    job_type:props.data?.job_type,
                    email:props.data?.email,


                }}
            >
                <Form.Item
                    label="Name:"
                    name="name"
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
                    name="gender"
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
                                "Save"
                            )}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditItemModal;
