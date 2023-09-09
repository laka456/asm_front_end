import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { DatePicker } from "antd";


function OrderAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    // GetdashboardOrderGraphApi(currentYear, currentMonth).then((apiResponse) => {
    //   if (apiResponse.success) {
    //     setData(apiResponse.data);
    //   }
    // });
  }, []);

  async function onChange(date, dateString) {
    const [year, month] = dateString.split("-");

    // const apiResponse = await GetdashboardOrderGraphApi(year, month);
    // if (apiResponse.success) {
    //   setData(apiResponse.data);
    // }
  }

  const config = {
    data,
    height: 300,
    padding: "auto",
    xField: "date",
    yField: "ordersCount",
    xAxis: {
      tickCount: 5,
    },
  };

  return (
    <div className="bg-white p-5 rounded-md ">
      <div className="flex items-center justify-between">
        <div className="text-lg mb-5 font-semibold text-gray-600">
          Daily Orders
        </div>
        <DatePicker picker="month" onChange={onChange} />
      </div>
      <Line {...config} />
    </div>
  );
}

export default OrderAnalytics;
