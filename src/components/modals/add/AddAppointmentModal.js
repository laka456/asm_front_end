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
    message, Space, DatePicker,TimePicker
} from "antd";
import ImgCrop from "antd-img-crop";
import React, {useEffect, useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";


import {
    openNotificationError,
    openNotificationSuccess,
} from "../../../helpers/Notifications";

import GetSeekersTableApi from "../../../api/Seekers/GetSeekersTableApi";

import {GetConsultantApi} from "../../../api/Consultant/GetConsultantApi";
import dayjs from "dayjs";
import AddApponitmentApi from "../../../api/Appointments/AddApponitmentApi";

const {TextArea} = Input;
const {Option} = Select;

function AddSeekerModal(props) {

    const dateFormat = 'YYYY/MM/DD';

    const [submit, setSubmit] = useState(false);

    const [form] = Form.useForm();

    const [seekers, setSeekers] = useState();
    const [consultants, setConsultants] = useState();

    useEffect(() => {
        if (props.visible) {
            getSeekers()
            getConsultants()
        }
    }, [props.visible]);

    function handleCancel() {
        setSubmit(false);
        // selectCategory();
        props.handleCancel();
        form.resetFields();
    }


    async function getSeekers() {
        const apiResponse = await GetSeekersTableApi();
        if (apiResponse.status === 200) {
            setSeekers(apiResponse.data);
        }
    }

    async function getConsultants() {
        const apiResponse = await GetConsultantApi();
        if (apiResponse.status === 200) {
            setConsultants(apiResponse.data);
        }
    }


    async function onFinish(values) {
        setSubmit(true);
        const apiResponse = await AddApponitmentApi(
           values.date,
            values.startTime,
            values.endTime,
            values.type,
            values.seekerId,
            values.consultantId,
        );
        console.log(values.date ,values.endTime)
        if (apiResponse.status === 400 || apiResponse.status === 500) {
            openNotificationError("bottomRight", apiResponse.message);
        } else if (apiResponse.status === 200) {
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
            title="Add Appointment"
            open={props.visible}
            onCancel={() => handleCancel()}
            footer={null}
            destroyOnClose={true}
        >
            <Form
                name="addAppointment"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark={false}
                form={form}
            >
                <Form.Item
                    label="Date:"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please enter  Date!",
                        },
                    ]}
                >

                        <DatePicker defaultValue={dayjs('2023/09/09', dateFormat)} format={dateFormat} />


                </Form.Item>

                <Form.Item
                    label="Start Time:"
                    name="startTime"
                    rules={[
                        {
                            required: true,
                            message: "Please enter  Date!",
                        },
                    ]}
                >

                        <TimePicker defaultValue={dayjs('12:00:00', 'HH:mm:ss')} size="large" />


                </Form.Item>

                <Form.Item
                    label="End Time:"
                    name="endTime"
                    rules={[
                        {
                            required: true,
                            message: "Please enter  Date!",
                        },
                    ]}
                >

                    <TimePicker defaultValue={dayjs('12:00:00', 'HH:mm:ss')} size="large" />


                </Form.Item>

                <Form.Item
                    label="Type:"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: "Please enter  Type!",
                        },
                    ]}
                >
                    <Input  />
                </Form.Item>






                <Form.Item label="Seeker :" name="seekerId">
                    <Select
                        allowClear
                        showSearch
                        placeholder="Select Seeker"
                        rules={[
                            {
                                required: true,
                                message: "Please select Seeker!",
                            },
                        ]}

                    >
                        {seekers?.map((seeker) => {
                            return (
                                <Option key={seeker.id} value={seeker.id}>
                                    {seeker.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Consultant :" name="consultantId">
                    <Select
                        allowClear
                        showSearch
                        placeholder="Select Consultant"
                        rules={[
                            {
                                required: true,
                                message: "Please select Consultant!",
                            },
                        ]}

                    >
                        {consultants?.map((seeker) => {
                            return (
                                <Option key={seeker.id} value={seeker.id}>
                                    {seeker.user.name}   [ {seeker.job_type  } , {seeker.country} ]
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item style={{marginBottom: 0}}>
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
                                    indicator={<LoadingOutlined style={{color: "#fff"}} spin/>}
                                />
                            ) : (
                                "Add Appointment"
                            )}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddSeekerModal;

// import React from 'react';
// import dayjs from 'dayjs';
// import { Space, TimePicker } from 'antd';
//
// const App: React.FC = () => (
//     <Space wrap>
//         <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
//
//     </Space>
// );
//
// export default App;