import {
  Button,
  Table,

  Tooltip,
  theme,
  Space,

} from "antd";
import React, { useEffect, useState } from "react";
import {

  PlusOutlined,
  WarningOutlined,

  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";

import MainLoader from "../../Loader/MainLoader";

import AddConsultantModal from "../../components/modals/add/AddConsultantModal";
import EditConsultantModal from "../../components/modals/edit/EditConsultantModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import {GetConsultantApi} from "../../api/Consultant/GetConsultantApi";
import {openNotificationError, openNotificationSuccess} from "../../helpers/Notifications";
import DeleteConsultantApi from "../../api/Consultant/DeleteConsultantApi";
const { useToken } = theme;

function Consultant() {
  const { token } = useToken();
  const [canShowTable, setCanShowTable] = useState(true);
  const [addModal, setAddModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState();
  const [canStart, setCanStart] = useState(true);

  const proHeight = document.body.clientHeight;

const [selectItem, setSelectItem] = useState();



  useEffect(() => {

      getCategories();

  }, [selectItem]);

  async function getCategories() {
    setTableLoading(true);
    const apiResponse = await GetConsultantApi();
    if (apiResponse.status === 200  ) {
      if (apiResponse.data?.length) {
        setCanShowTable(true);
      }
      setData(apiResponse.data);
      setCanStart(true);
      setTableLoading(false);

    }
  }
  async function deleteConsultant() {
    const apiResponse = await DeleteConsultantApi(
        selectItem.id,

    );
    if (apiResponse.status === 400 || apiResponse.status === 500 || apiResponse.status === 405  ) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.status === 200) {
      openNotificationSuccess("bottomRight", "Item deleted");

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
      render: (text, record) => (
    
          <h1>
            {record.user.name}
          </h1>
      )


    },

    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
    },
    {
      title: "country",
      dataIndex: "country",
      key: "country",


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

                  setEditModal(true);
                }}
            >
              <EditOutlined />
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
                <DeleteOutlined />
              </div>
            </Tooltip>

        </Space>
      ),
    },
  ];



  function showEmptyConsultants() {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-center">
          <div className="text-3xl text-gray-400">
            <WarningOutlined />
          </div>
          <div className="text-xl pri-font text-gray-400">
            No Consultant available
          </div>
          <div className="mb-3 text-gray-400">Add your first Consultant</div>
          <Button
            type="primary"
            style={{ background: token.colorPrimary }}
            onClick={() => setAddModal(true)}
          >
            Add a Consultant
          </Button>
        </div>
      </div>
    );
  }



  const right = (
    <>
      {canShowTable && (
        <>

          <Tooltip placement="left" title={"Add Consultant"}>
            <Button
              style={{ background: token.colorPrimary }}
              shape="circle"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddModal(true)}
            ></Button>
          </Tooltip>
        </>
      )}
    </>
  );

  const left = <div className="pri-font text-lg">Consultants</div>;

  return (
    <>
      <DashboardBreadcrumb left={left} right={right} />
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
              <div>


                <Table
                    className="hidden md:block"
                    dataSource={data}
                    columns={columns}
                    loading={tableLoading}
                    pagination={{ position: ["none"] }}
                />
              </div>

            </>
          ) : (
            showEmptyConsultants()
          )
        ) : (
          <MainLoader />
        )}
      </div>
      <AddConsultantModal
        visible={addModal}
        data={data}
        handleCancel={() => setAddModal(false)}
        handleOk={() => getCategories(1)}
      />

      <EditConsultantModal
        data={selectItem}
        visible={editModal}
        handleOk={() => getCategories(1)}
        handleCancel={() => setEditModal(false)}
      />
      <ConfirmationModal
          visible={deleteModal}
          handleCancel={() => {
            setDeleteModal(false);
            setSelectItem("");
          }}
          handleOk={() => {
            deleteConsultant();
            setDeleteModal(false);
          }}
          text="Are you sure want to delete "
          title="Delete "
      />
    </>
  );
}

export default Consultant;
