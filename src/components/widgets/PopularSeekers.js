import { Empty, Tag } from "antd";
import React, { useEffect, useState } from "react";


function PopularSeekers() {
  const [data, setData] = useState();


  useEffect(() => {
    getPopularSeekers();
  }, []);

  async function getPopularSeekers() {

  }

  function getSeekers() {
    let output = [];

    data?.map((item) => {
      output.push(
        <div key={item.menuId} className="flex justify-between mb-2">
          <div>
            <div className="truncate">{item.menuName}</div>
            <div className="text-xs text-gray-500">{item.ConsultantName}</div>
          </div>
          <div>{item.noOfSeekers}</div>
        </div>
      );
    });
    return output;
  }
  return (
    <div className="bg-white p-5 rounded-md ">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg mb-2 font-semibold text-gray-600">
          Popular items
        </div>
        <div className="text-gray-400">Today</div>
      </div>
      {data ? (
        <div className="text-gray-600">{getSeekers()}</div>
      ) : (
        <Empty description={<span>No popular consultants available</span>} />
      )}
    </div>
  );
}

export default PopularSeekers;
