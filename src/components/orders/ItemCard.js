import { Card, Tooltip } from "antd";
import React, { useState } from "react";

import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import EditOrderedItemModal from "../modals/edit/EditOrderedItemModal";
import OrderedItemInfoModal from "../modals/OrderedItemInfoModal";

function ItemCard(props) {
  const [editModal, setEditModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  return (
    <Card size="small" title={false} bordered={false}>
      <div className="flex items-start justify-between mb-1">
        {props.data?.item}
        <div className="flex items-center gap-2">
          <Tooltip title={"Info"}>
            <div
              onClick={() => {
                setInfoModal(true);
              }}
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              <InfoCircleOutlined />
            </div>
          </Tooltip>
          <Tooltip title={"Edit"}>
            <div
              onClick={() => {
                setEditModal(true);
              }}
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              <EditOutlined />
            </div>
          </Tooltip>
          <Tooltip title={"Delete"}>
            <div
              onClick={() => {}}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              <DeleteOutlined />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex items-start justify-between">
        {props.data?.no} <div>{props.data?.price}</div>
      </div>

      <OrderedItemInfoModal
        visible={infoModal}
        handleCancel={() => setInfoModal(false)}
      />
      <EditOrderedItemModal
        visible={editModal}
        handleCancel={() => setEditModal(false)}
      />
    </Card>
  );
}

export default ItemCard;
