import React, { useState } from "react";
import { Form, Input, Button, Card, Spin, theme } from "antd";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ResetPasswordApi from "../../api/Auth/ResetPasswordApi";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../helpers/Notifications";

function ResetPassword() {
  const [submit, setSubmit] = useState(false);
  const { token } = useParams();
  const [form] = Form.useForm();
  let navigate = useNavigate();

  async function onFinish(values) {
    setSubmit(true);
    if (!strongPassword(values.password)) {
      form.setFields([
        {
          name: "password",
          errors: ["Enter a strong password!"],
        },
      ]);
    } else if (values.password !== values.confirmPassword) {
      form.setFields([
        {
          name: "confirmPassword",
          errors: ["Password doesn't match!"],
        },
      ]);
    } else {
      const apiResponse = await ResetPasswordApi(
        values.password,
        values.confirmPassword,
        token
      );
      if (apiResponse.error) {
        openNotificationError("bottomRight", "Reset password success");
      } else {
        openNotificationSuccess("bottomRight", apiResponse.message);
        navigate(`/login`);
      }
    }
    setSubmit(false);
  }

  function strongPassword(password) {
    let strength = false;
    const passwordArray = password.split("");
    let lowercase = false;
    let uppercase = false;
    let number = false;
    let length = false;
    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    passwordArray.map((pass) => {
      if (pass.match(lowerCaseLetters)) {
        lowercase = true;
      }
    });
    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    passwordArray.map((pass) => {
      if (pass.match(upperCaseLetters)) {
        uppercase = true;
      }
    });
    // Validate numbers
    const numbers = /[0-9]/g;
    passwordArray.map((pass) => {
      if (pass.match(numbers)) {
        number = true;
      }
    });
    // Validate length
    if (passwordArray.length >= 8) {
      length = true;
    }
    if (lowercase && uppercase && number && length) {
      strength = true;
    }

    return strength;
  }

  return (
    <>
      <div
        className="h-screen flex w-full items-center justify-center"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="w-full max-w-lg p-3">
          <Card
            style={{
              borderColor: "#e5e7eb",
            }}
          >
            <div className="text-2xl pri-font text-center mb-2">
              Reset your password
            </div>
            <div className="mb-4 text-xs text-center">
              Your password must be at least 8 characters long, contain at least
              one number, one uppercase letter and one lowercase letter.
            </div>
            <Form
              name="resetPassword"
              onFinish={onFinish}
              form={form}
              className="w-full max-w-lg"
            >
              <Form.Item name="password">
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="New Password"
                />
              </Form.Item>

              <Form.Item name="confirmPassword">
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Confirm Password"
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
                    "Reset Password"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
