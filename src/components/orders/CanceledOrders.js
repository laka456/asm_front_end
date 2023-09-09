import { Space, Table, Tooltip } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ItemCard from "./ItemCard";

const dataSource = [
  {
    key: "1",
    orderId: "001",
    table: 4,
    noOfSeekers: 2,
    totalPrice: "$200",
    orders: [
      {
        item: "Chicken & sweet corn",
        no: 2,
        orderedBy: "Tim Cook, Steve Jobs",
        price: "$100",
      },
      {
        item: "sweet corn",
        no: 1,
        orderedBy: "Sasikumar",
        price: "$100",
      },
    ],
  },
  {
    key: "2",
    orderId: "002",
    table: 9,
    noOfSeekers: 1,
    totalPrice: "$200",
    orders: [
      {
        item: "Chicken noodles",
        no: 2,
        orderedBy: "Ajith",
        price: "$100",
      },
    ],
  },
];

function CanceledOrders() {
  const columns = [
    {
      title: "OrderID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Table",
      dataIndex: "table",
      key: "table",
    },
    Table.EXPAND_COLUMN,
    {
      title: "No of items",
      dataIndex: "noOfSeekers",
      key: "noOfSeekers",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title={"Cancel"}>
            <div className="text-red-500 hover:text-red-600 cursor-pointer text-base">
              <DeleteOutlined />
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <>
            <p
              style={{
                margin: 0,
              }}
            >
              <div className="grid gap-x-4 gap-y-4 grid-cols-4">
                {record?.orders?.map((item) => (
                  <ItemCard data={item} />
                ))}
              </div>
            </p>
          </>
        ),
      }}
    />
  );
}

export default CanceledOrders;
