import { Layout } from "antd";
import React from "react";
import HeaderLayoutAdmin from "./components/header";
import SidebarLayoutAdmin from "./components/sidebar";
import MainLayoutAdmin from "./components/main";
const { Footer } = Layout;
const LayoutAdmin: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderLayoutAdmin />
      <Layout>
        <SidebarLayoutAdmin />
        <MainLayoutAdmin />
      </Layout>
      <Footer style={{ textAlign: "center" }}>ADMIN QUẢN TRỊ</Footer>
    </Layout>
  );
};

export default LayoutAdmin;
