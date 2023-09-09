import React, { useState, useEffect } from "react";

import { Pie } from "@ant-design/plots";
import { GetAppointmentStatsi } from "../../api/Dashboard/GetAppointmentStatsi";

function SeekersAvailability() {
  const [data, setData] = useState();

  useEffect(() => {
    getItemStatusCount();
  }, []);

  async function getItemStatusCount() {
    const apiResponse = await GetAppointmentStatsi();
    if (apiResponse.success) {
      setData(apiResponse.data);
    }
  }
  const availableSeekers = data?.AvailableSeekers;

  const outOfStockSeekers = data?.OutOfStockSeekers;

  const count = [
    {
      type: "Available",
      value: availableSeekers > 0 ? availableSeekers : "",
    },
    {
      type: "Out of stock",
      value: outOfStockSeekers > 0 ? outOfStockSeekers : "",
    },
  ];
  const noCount = [
    {
      type: "No Seekers",
      value: 0,
    },
  ];

  const checkNoSeekers =
    availableSeekers === 0 && outOfStockSeekers === 0;

  const config = {
    appendPadding: 10,
    data: checkNoSeekers ? noCount : count,
    height: 150,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: checkNoSeekers ? "" : "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
      autoRotate: false,
    },

    theme: {
      colors10: checkNoSeekers ? ["#808080"] : ["#62DAAB", "#f50"],
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
        <div className="text-lg mb-2 font-semibold text-gray-600">Seekers</div>
        <div className="text-gray-400">Today</div>
      </div>
      <Pie {...config} />
    </div>
  );
}

export default SeekersAvailability;
