import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ReadOutlined,
  ProfileOutlined,
  UserOutlined,
  UserSwitchOutlined,
  GatewayOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link to="/dashboard">Dashboard</Link>, "0", <AppstoreOutlined />),

  getItem(<Link to="/appointments">Appointments</Link>, "2", <ProfileOutlined />),
  getItem(<Link to="/consultants">Consultant</Link>, "3", <UserSwitchOutlined />),
  getItem(<Link to="/seekers">Job Seekers</Link>, "4", <UserOutlined />),
  getItem(<Link to="/users">Users</Link>, "5", <UserOutlined />),

//  getItem(<Link to="/settings">Settings</Link>, "7", <SettingOutlined />),
  // getItem(<Link to="/employees">Employees</Link>, "5", <UserOutlined />),
  // getItem("Reports", "7", <FileZipOutlined />, [
  //   getItem("Option 1", "7sub1"),
  //   getItem("Option 2", "7sub2"),
  // ]),
];

const paths = [
  { path: "/dashboard", key: "0" },
  { path: "/appointments", key: "1" },
  { path: "/consultants", key: "2" },
  { path: "/seekers", key: "3" },
  { path: "/users", key: "4" },

];

function DashboardSideMenu() {
  const [mainKey, setMainKey] = useState("");
  let curLocation = useLocation();


  return (
    <Menu
    className="pt-12"
      selectedKeys={[mainKey]}
      mode="inline"
      items={items}
      style={{ border: "none" }}
    />
  );
}

export default DashboardSideMenu;
