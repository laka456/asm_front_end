import { Spin } from "antd";
import React from "react";

function MainLoader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Spin className={'text-3xl'} size="large" />
    </div>
  );
}

export default MainLoader;
