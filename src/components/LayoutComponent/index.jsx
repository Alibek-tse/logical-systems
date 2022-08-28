import React from "react";
import { Layout } from "antd";
import Map from "../Map";

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  return (
    <Layout style={{ height: "100vh", width: "100wh" }}>
      <Sider collapsed collapsedWidth={400} style={{ backgroundColor: "#fff" }}>
        Sider
      </Sider>
      <Layout>
        <Content>
          <Map />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
