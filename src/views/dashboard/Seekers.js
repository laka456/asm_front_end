import {
  Button,
  Tooltip,
  theme,
  Table,
  Space,

} from "antd";
import React, { useEffect, useState } from "react";
import {

  PlusOutlined,
   EditOutlined, DeleteOutlined,
} from "@ant-design/icons";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";



import GetSeekersTableApi from "../../api/Seekers/GetSeekersTableApi";
import MainLoader from "../../Loader/MainLoader";

import DeleteSeekersApi from "../../api/Seekers/DeleteSeekersApi";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../helpers/Notifications";

import AddSeekerModal from "../../components/modals/add/AddSeekerModal";
import EditSeekerModal from "../../components/modals/edit/EditSeekerModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import GetSeekers from "../../api/Seekers/GetSeekers";

const { useToken } = theme;

function Seekers() {
  const { token } = useToken();

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
    const apiResponse = await GetSeekersTableApi();


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
    const apiResponse = await DeleteSeekersApi(
        selectItem.id,

    );
    if (apiResponse.status === 400 || apiResponse.status === 500 || apiResponse.status === 405  ) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.status === 200) {
      openNotificationSuccess("bottomRight", "Seeker Deleted");

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
      title: "Address",
      dataIndex: "address",
      key: "address",

    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",

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




  const right = (
      <>

            <>
              <Tooltip placement="left" title={"Add categories"}>
                <Button
                    style={{ background: token.colorPrimary }}
                    shape="circle"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setAddModal(true);
                    }}
                ></Button>
              </Tooltip>
            </>

      </>
  );


  const left = <div className="pri-font text-lg">Seekers</div>;
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

              <Table
                  className="hidden md:block"
                  dataSource={data}
                  columns={columns}
                  loading={tableLoading}
                  rowClassName=" cursor-pointer"

              />

          
            </>
          ) : (
              <MainLoader />
          )
        ) : (
          <MainLoader />
        )}
      </div>
      <AddSeekerModal
          visible={addModal}
          data={data}
          handleCancel={() => setAddModal(false)}
          handleOk={() => getSeekers(1)}
      />
      <EditSeekerModal
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
