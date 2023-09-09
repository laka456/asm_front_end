import { Button, Form, Input, Select, Upload, message, Spin } from "antd";
import React, { useState } from "react";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";


import {
  openNotificationError,
  openNotificationSuccess,
} from "../../helpers/Notifications";

import { userDetails } from "../../features/UserSlice";
import EditUserApi from "../../api/User/EditUserApi";

const { Option } = Select;

function Profile() {
  const [submit, setSubmit] = useState(false);



  const [valuesChanged, setValuesChanged] = useState(false);

  const userState = useSelector((state) => state.userState.value);
  const dispatch = useDispatch();



  const left = (
    <>
      <div className="pri-font text-lg hidden md:block">User Profile</div>
    </>
  );

  const fields = [
    {
      name: ["First Name"],
      value: userState?.firstName || "",
    },
            {
      name: ["Last Name"],
      value: userState?.firstName || "",
    },

   

  ];



  async function onFinish(values) {
    setSubmit(true);
    const apiResponse = await EditUserApi(
        userState?.id,
        values.firstName,
        values.lastName,
        ""

    );
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      dispatch(userDetails(apiResponse.data));
      openNotificationSuccess(
        "bottomRight",
        "User profile successfully updated"
      );
    }
    setSubmit(false);
    setValuesChanged(false);
  }



  return (
      <>
        <div className="mx-4">
          <DashboardBreadcrumb left={left}/>
          <div className="bg-white p-4 ">
            <Form
                name="userProfile"
                onValuesChange={() => {
                  setValuesChanged(true);
                }}
                fields={fields}
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  firstName: userState?.firstName,
                  lastName: userState?.lastName,
                }}
                className="grid mt-2 gap-4 "
            >


             

              <div className="max-w-xl">
                
                  <Form.Item

                      name="firstName"
                      label="First Name"

                      rules={[
                        {
                          required: true,
                          message: "Please enter your First name!",
                        },
                      ]}
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item

                      name="lastName"
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your First name!",
                        },
                      ]}
                  >
                    <Input/>
                  </Form.Item>
              
              

                <Button
                    className="w-40"
                    type="primary"
                    htmlType={submit && "submit"}
                    //  disabled={valuesChanged}
                >
                  {submit ? (
                      <Spin
                          size="small"
                          indicator={
                            <LoadingOutlined style={{color: "#fff"}} spin/>
                          }
                      />
                  ) : (
                      "Save"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
  );
}

export default Profile;
