import { Button, Card, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../features/AuthSlice";
import { GetMeApi } from "../../api/User/GetMeApi";
import { userDetails } from "../../features/UserSlice";

import LoginApi from "../../api/Auth/LoginApi";


function Login() {
  const authState = useSelector((state) => state.authState.value);
  const [submit, setSubmit] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.userState?.value);


  function showErrorMessage(message) {
    if (message === "Invalid credentials") {
      form.setFields([
        {
          name: "username",
          errors: [""],
        },
        {
          name: "password",
          errors: ["Username and password didn't match"],
        },
      ]);
    } else if (
      message ===
      "User does not exist. Please try again with the User Name you signed up previously"
    ) {
      form.setFields([
        {
          name: "username",
          errors: ["User not found"],
        },
      ]);
    } else {
      form.setFields([
        {
          name: "username",
          errors: [""],
        },
        {
          name: "password",
          errors: ["Couldn't login. Try again later."],
        },
      ]);
    }
  }

  async function onFinish(values) {
    setSubmit(true);
    const apiResponse = await LoginApi(values.username, values.password);
  //   console.log("apiResponse ",apiResponse)
  console.log("authState onFinish ",authState)


    if (apiResponse) {
      console.log("--------------------------------------")
      localStorage.setItem("authToken", apiResponse?.access_token);
      // localStorage.setItem("authUser", apiResponse.data?.username);
      // getUserDetails();
      dispatch(login());
      navigate(`/dashboard`);
      // dispatch(userDetails("admin"));


    } else {
      showErrorMessage("Something is wrong");
    }
    setSubmit(false);
  }

  async function getUserDetails() {
    const apiResponse = await GetMeApi();
    if (apiResponse.statusCode) {
      localStorage.setItem("authToken", "");
      localStorage.setItem("authUser", "");
      dispatch(logout());
    } else if (apiResponse.username) {
      dispatch(login());
      dispatch(userDetails(apiResponse));
    } else {
      localStorage.setItem("authToken", "");
      localStorage.setItem("authUser", "");
      dispatch(logout());
    }
  }

  return (
    <div
      className="h-screen flex w-full  items-center justify-center "
      style={{ backgroundColor: "#fff" }}
    >
      <div className="w-full max-w-lg p-3">
        <div className=" flex justify-center mb-6">

        </div>
        <Card
          style={{
            borderColor: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          <div className="text-3xl pri-font text-center mb-1">Welcome</div>
          <div className="text-center mb-6 text-gray-500">
            Admin! Enter your credentials to access your account
          </div>
          <Form
            name="login"
            className="w-full max-w-lg"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType={submit && "submit"}
                className="w-full"
              >
                {submit ? (
                  <Spin
                    size="small"
                    indicator={
                      <LoadingOutlined style={{ color: "#fff" }} spin />
                    }
                  />
                ) : (
                  "Log in"
                )}
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5 mb-4">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-blue-500">
              Reset password
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Login;
