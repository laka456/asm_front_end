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
    DeleteOutlined,
} from "@ant-design/icons";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";

import MainLoader from "../../Loader/MainLoader";

import {
    openNotificationError,
    openNotificationSuccess,
} from "../../helpers/Notifications";


import ConfirmationModal from "../../components/modals/ConfirmationModal";

import AddUserModal from "../../components/modals/add/AddUserModal";
import GetUsersTableApi from "../../api/User/GetUsersTableApi";
import DeleteUsersApi from "../../api/User/DeleteSeekersApi";

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

    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        getSeekers(1);
    }, []);


    async function getSeekers(number) {

        setTableLoading(true);
        const apiResponse = await GetUsersTableApi();

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
        const apiResponse = await DeleteUsersApi(
            selectItem.id,
        );
        if (apiResponse.status === 400 || apiResponse.status === 500 || apiResponse.status === 405) {
            openNotificationError("bottomRight", apiResponse.message);
        } else if (apiResponse.status === 200) {
            openNotificationSuccess("bottomRight", "User deleted");

        } else {
            openNotificationError("bottomRight", "Couldn't delete. Try again later.");
        }
        setSelectItem("");
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",


        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",

        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",

        },


        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">

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


    const left = <div className="pri-font text-lg">Users</div>;
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
            <AddUserModal
                visible={addModal}
                data={data}
                handleCancel={() => setAddModal(false)}
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
