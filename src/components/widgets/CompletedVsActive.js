import React, { useState, useEffect } from "react";

import { Pie } from "@ant-design/plots";


function CompletedVsActive() {
  const [data, setData] = useState();

  useEffect(() => {
    getOrderStatusCount();
  }, []);

  async function getOrderStatusCount() {
    // const apiResponse = await GetDashboardOrderCountApi();
    // if (apiResponse.success) {
    //   setData(apiResponse.data);
    // }
  }


  // const completedOrders = data?.CompletedOrders;
  const completedOrders = 5;
  const availableOrders = 8;
  // const availableOrders = data?.AvailableOrders;
console.log(completedOrders,availableOrders)
  const count = [
    {
      type: "Completed Appointments",
      value:10,
    },
    {
      type: "Active Appointments",
      value: 5,
    },
  ];
  const noCount = [
    {
      type: "No Appointments",
      value: 0,
    },
  ];

 const checkNoOrder = () => completedOrders === 0 && availableOrders === 0 ? true : false;


  const config = {
    appendPadding: 10,
    data: count,
    height: 250,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content:checkNoOrder ? '' : "{value}" ,
      style: {
        textAlign: "center",
        fontSize: 14,
      },
      autoRotate: false,
    },
    theme: {
      colors10:checkNoOrder ? ["#808080"] :  ["#6395F9", "#FAB324"],
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
  };
  return (
    <div className="bg-white p-5 rounded-md ">
      <div className="flex justify-between items-center">
        <div className="text-lg mb-2 font-semibold text-gray-600">Appointments</div>
        <div className="text-gray-400">Today</div>
      </div>
      <Pie {...config} />
    </div>
  );
}

export default CompletedVsActive;
