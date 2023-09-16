import {
    Button,
    Tooltip,
    theme,
    Table,
    Space,

} from "antd";
import React, {useEffect, useState} from "react";
import {

    PlusOutlined,
    EditOutlined, DeleteOutlined,
} from "@ant-design/icons";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";

import MainLoader from "../../Loader/MainLoader";

import {
    openNotificationError,
    openNotificationSuccess,
} from "../../helpers/Notifications";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import GetAppointmentTableApi from "../../api/Appointments/GetAppointmentTableApi";
import {GetDate, GetTime} from "../../helpers/Date&Time";
import AddAppointmentModal from "../../components/modals/add/AddAppointmentModal";
import DeleteAppointmentApi from "../../api/Appointments/DeleteAppointmentApi";
import EditAppointmentModal from "../../components/modals/edit/EditAppointmentModal";

const {useToken} = theme;

function Seekers() {
    const {token} = useToken();

    const [canShowTable, setCanShowTable] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [data, setData] = useState();
    const [canStart, setCanStart] = useState(true);
    const [page, setPage] = useState(1);

    const [selectItem, setSelectItem] = useState();

    const proHeight = document.body.clientHeight;

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        getSeekers(1);
    }, [selectItem]);


    async function getSeekers(number) {

        setTableLoading(true);
        const apiResponse = await GetAppointmentTableApi();


        if (apiResponse.status === 200) {
            if (apiResponse?.data?.length) {
                setCanShowTable(true);
            }
            setPage(number)
            setData(apiResponse?.data);
            setCanStart(true);
            setTableLoading(false);

        }
    }


    async function deleteItem() {
        const apiResponse = await DeleteAppointmentApi(
            selectItem.id,
        );
        if (apiResponse.status === 400 || apiResponse.status === 500 || apiResponse.status === 405) {
            openNotificationError("bottomRight", apiResponse.message);
        } else if (apiResponse.status === 200) {
            openNotificationSuccess("bottomRight", "Appointment Deleted");

        } else {
            openNotificationError("bottomRight", "Couldn't Delete. Try again later.");
        }
        setSelectItem("");
    }



    const columns = [
        {
            title: "Seeker",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <h1>{record.seeker.name}</h1>)
            ,

        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (text, record) => (
                <h1>{record.seeker.address}</h1>)
            ,

        },
        {
            title: "Consultant Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <h1>{record.consultant.user.name} ({record.consultant.country})</h1>)
            ,

        },

        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text, record) => (
                <h1>{GetDate(record.date)}</h1>)
            ,

        },

        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (text, record) => (
                <h1>{GetTime(record.startTime)}</h1>)
            ,
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            render: (text, record) => (
                <h1>{GetTime(record.endTime)}</h1>)
            ,

        },
        {
            title: "Seeker Job Type",
            dataIndex: "job_type",
            key: "job_type",
            render: (text, record) => (
                <h1>{record.seeker.job_type}</h1>)
            ,

        },

        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">

                    <Tooltip title={"Edit"}>
                        <div
                            className="text-blue-500 hover:text-blue-600 cursor-pointer"
                            onClick={() => {

                                setSelectItem(record);
                                setEditModal(true);
                            }}
                        >
                            <EditOutlined/>
                        </div>
                    </Tooltip>

                    <Tooltip title={"Delete"}>
                        <div
                            onClick={() => {
                                setSelectItem(record);
                                setDeleteModal(true);
                            }}
                            className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                            <DeleteOutlined/>
                        </div>
                    </Tooltip>

                </Space>
            ),
        },


    ];

    const items = [
        {
            label: (
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        setEditModal(true);
                    }}
                >
                    Edit
                </div>
            ),
            key: "0",
        },
        {
            label: (
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        setDeleteModal(true);
                    }}
                >
                    Delete
                </div>
            ),
            key: "1",
        },
    ];


    const right = (
        <>

            <>
                <Tooltip placement="left" title={"Add categories"}>
                    <Button
                        style={{background: token.colorPrimary}}
                        shape="circle"
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={() => {
                            setAddModal(true);
                        }}
                    ></Button>
                </Tooltip>
            </>

        </>
    );


    const left = <div className="pri-font text-lg">Appointments</div>;
    return (
        <>
            <DashboardBreadcrumb left={left} right={right}/>
            <div
                style={{
                    height: proHeight - 122,
                    overflow: "auto",
                }}
                className="custom-scroll "
            >
                {canStart ? (
                    canShowTable ? (
                        <>

                            <Table
                                className="hidden md:block"
                                dataSource={data}
                                columns={columns}
                                loading={tableLoading}
                                rowClassName=" cursor-pointer"

                            />


                        </>
                    ) : (
                        <MainLoader/>
                    )
                ) : (
                    <MainLoader/>
                )}
            </div>
            <AddAppointmentModal
                visible={addModal}
                data={data}
                handleCancel={() => setAddModal(false)}
                handleOk={() => getSeekers(1)}
            />
            <EditAppointmentModal
                visible={editModal}
                data={selectItem}
                handleCancel={() => setEditModal(false)}
                handleOk={() => getSeekers(1)}
            />
            <ConfirmationModal
                visible={deleteModal}
                handleCancel={() => {
                    setDeleteModal(false);
                    setSelectItem("");
                }}
                handleOk={() => {
                    deleteItem();
                    setDeleteModal(false);
                }}
                text="Are you sure want to delete ?"
                title="Delete "
            />


        </>
    );
}

export default Seekers;
