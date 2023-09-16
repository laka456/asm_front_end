import {
    Button, Form, Input, InputNumber, Modal, Select, Spin, Upload, message, DatePicker, TimePicker,
} from "antd";
import React, {useEffect, useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

import {
    openNotificationError, openNotificationSuccess,
} from "../../../helpers/Notifications";


import EditSeekerApi from "../../../api/Seekers/EditSeekerApi";
import dayjs from "dayjs";
import GetSeekersTableApi from "../../../api/Seekers/GetSeekersTableApi";
import {GetConsultantApi} from "../../../api/Consultant/GetConsultantApi";
const {Option} = Select;
function EditAppointmentModal(props) {
    const [submit, setSubmit] = useState(false);
    const [seekers, setSeekers] = useState();
    const [consultants, setConsultants] = useState();
    const dateFormat = 'YYYY/MM/DD';


    useEffect(() => {

        getSeekers()
        getConsultants()
    }, []);

    function handleCancel() {
        setSubmit(false);
        props.handleCancel();
    }

    async function onFinish(value) {
        setSubmit(true);
        const apiResponse = await EditSeekerApi(props.data?.id, value.name, value.address, value.gender, value.phone, value.country, value.job_type, value.email,);


        if (apiResponse.status === 400 || apiResponse.status === 500 || apiResponse.status === 405) {
            openNotificationError("bottomRight", apiResponse.message);
        } else if (apiResponse.status === 200) {
            openNotificationSuccess("bottomRight", " Appointment Details successfully changed");
            props.handleOk();
        } else {
            openNotificationError("bottomRight", "Couldn't edit . Try again later.");
        }
        handleCancel();
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



    return (<Modal
            title="Edit Appointment"
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
                    date: dayjs(props.data?.date, dateFormat),
                    // startTime: dayjs(props.data?.startTime, 'HH:mm:ss'),
                    // endTime: dayjs(props.data?.endTime, 'HH:mm:ss'),
                    // type: props.data?.type,
                    // seekerId: props.data?.seekerId,
                    // consultantId: props.data?.consultantId,



                }}
            >
                <Form.Item
                    label="Date:"
                    name="date"
                    rules={[{
                        required: true, message: "Please enter  Date!",
                    },]}
                >

                    <DatePicker defaultValue={dayjs('2023/09/09', dateFormat)} format={dateFormat}/>


                </Form.Item>

                <Form.Item
                    label="Start Time:"
                    name="startTime"
                    rules={[{
                        required: true, message: "Please enter  Date!",
                    },]}
                >

                    <TimePicker defaultValue={dayjs('12:00:00', 'HH:mm:ss')} size="large"/>


                </Form.Item>

                <Form.Item
                    label="End Time:"
                    name="endTime"
                    rules={[{
                        required: true, message: "Please enter  Date!",
                    },]}
                >

                    <TimePicker defaultValue={dayjs('12:00:00', 'HH:mm:ss')} size="large"/>


                </Form.Item>

                <Form.Item
                    label="Type:"
                    name="type"
                    rules={[{
                        required: true, message: "Please enter  Type!",
                    },]}
                >
                    <Input/>
                </Form.Item>


                <Form.Item label="Seeker :" name="seekerId">
                    <Select
                        allowClear
                        showSearch
                        placeholder="Select Seeker"
                        rules={[{
                            required: true, message: "Please select Seeker!",
                        },]}

                    >
                        {seekers?.map((seeker) => {
                            return (<Option key={seeker.id} value={seeker.id}>
                                    {seeker.name}
                                </Option>);
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Consultant :" name="consultantId">
                    <Select
                        allowClear
                        showSearch
                        placeholder="Select Consultant"
                        rules={[{
                            required: true, message: "Please select Consultant!",
                        },]}

                    >
                        {consultants?.map((seeker) => {
                            return (<Option key={seeker.id} value={seeker.id}>
                                    {seeker.user.name} [ {seeker.job_type} , {seeker.country} ]
                                </Option>);
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
                            {submit ? (<Spin
                                    size="small"
                                    indicator={<LoadingOutlined style={{color: "#fff"}} spin/>}
                                />) : ("Save")}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>);
}

export default EditAppointmentModal;
