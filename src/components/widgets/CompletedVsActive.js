import React, { useState, useEffect } from "react";

import { Pie } from "@ant-design/plots";
import {GetAppointmentStatsi} from "../../api/Dashboard/GetAppointmentStatsi";


function CompletedVsActive() {
  const [data, setData] = useState();

  useEffect(() => {
    getOrderStatusCount();
  }, []);

  async function getOrderStatusCount() {
    const apiResponse = await GetAppointmentStatsi();
    console.log(apiResponse)
    if (apiResponse.status === 200) {
      setData(apiResponse.data);
    }
  }



  const completedOrders = data?.totalAppointment;
  const availableOrders =data?.totalAvailability;




  return (
      <div className="bg-white p-5 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold text-gray-800">Appointment Stats</div>
          <div className="text-gray-400">Today</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-md text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-2">Completed</div>
            <div className="text-3xl font-bold text-blue-800">{completedOrders}</div>
          </div>
          <div className="bg-green-100 p-4 rounded-md text-center">
            <div className="text-2xl font-semibold text-green-600 mb-2">Available</div>
            <div className="text-3xl font-bold text-green-800">{availableOrders}</div>
          </div>
        </div>
      </div>
  );
}

export default CompletedVsActive;
