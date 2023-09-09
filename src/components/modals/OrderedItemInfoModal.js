import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GetOrderItemMoreInfoApi from "../../api/Orders/GetOrderItemMoreInfoApi";

function OrderedItemInfoModal(props) {
  const [data, setData] = useState();
  const curLocation = useLocation();

  useEffect(() => {
    if (props.visible) {
      getMoreInfo();
    }
  }, [props.visible]);

  async function getMoreInfo() {
    const path = curLocation.pathname;
    const id = path.split("/");

    const apiResponse = await GetOrderItemMoreInfoApi(
      id[2],
      props.data?.menuItemId
    );
    if (apiResponse.success) {
      setData(apiResponse.data);
    }
  }

  function getOrderedBy() {
    let output = [];

    data?.orderedBy?.map((orderby) => {
      output.push(
        <div key={orderby?.orderBy} className="ml-5">
          <div className="mb-2">
            <div>
              {orderby?.orderBy}: {orderby?.noOfSeekers}
            </div>
            <div className="flex">
              <span className="font-semibold">Note: </span>

              {getItem(orderby)}
            </div>
          </div>
        </div>
      );
    });
    return output;
  }

  function getItem(orderby) {
    let output = [];

    orderby?.items?.map((note) => {
      output.push(
        <div key={note?.note} className="ml-2">
          {note?.note}({note?.noOfSeekers})
        </div>
      );
    });
    return output;
  }

  return (
    <Modal
      title="Item info"
      open={props.visible}
      onCancel={props.handleCancel}
      footer={null}
      destroyOnClose={true}
    >
      <div className=" mb-2">
        <span className="font-semibold ">Item: </span>
        {data?.menuName}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Quantity: </span>
        {data?.noOfSeekers}
      </div>

      <div>
        <span className="font-semibold">Ordered by: </span>
      </div>
      {getOrderedBy()}
    </Modal>
  );
}

export default OrderedItemInfoModal;
