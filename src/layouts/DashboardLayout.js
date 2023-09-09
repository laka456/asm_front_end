import React, { useEffect, useState } from "react";
import { Drawer, Layout } from "antd";
import DashboardSideMenu from "../components/layout/DashboardSideMenu";
import { Link, Outlet } from "react-router-dom";
import DashboardHeader from "../components/layout/DashboardHeader";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
const { Sider } = Layout;

function DashboardLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const proWidth = document.body.clientWidth;


  useEffect(() => {
    /*In tab view collapse menu when loaded*/
    if (proWidth < 720) {
      setCollapsed(true);
    }
  }, []);

  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      {/*Main side menu*/}

      <Sider
        collapsible
        trigger={null}
        theme="light"
        collapsed={collapsed}
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          zIndex: 99,
        }}
        className="transparent-scroll hidden sm:block "
      >
        

        <DashboardSideMenu />
      </Sider>

      {/*Mobile side menu*/}

      <Drawer
        maskClosable={true}
        width="280px"
        closable={false}
        placement="left"
        onClose={() => setCollapsed(true)}
        open={!collapsed}
        className="sm:hidden "
        style={{ padding: 0 }}
      >
        <DashboardSideMenu />
      </Drawer>

      <Layout
        className="site-layout custom-scroll  "
        style={{
          transition: "all .2s",
          overflow: "auto",
          height: "100vh",
        }}
      >
        <DashboardHeader
          openMenu={() => setCollapsed(!collapsed)}
          menu={collapsed}
        />
        <Content className=" pb-2 overflow-y-auto custom-scroll my-4 ml-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
