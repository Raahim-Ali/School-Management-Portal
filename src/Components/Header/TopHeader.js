import React from "react";
import "./TopHeader.css";
import { theme, Layout } from "antd";
import UserMenu from "../Content/icon";
const { Header } = Layout;

function TopHeader({ selectedSection, email }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "Roboto",
          fontSize: "24px",
          fontWeight: "bold",
          color: "black",
          marginLeft: "20px",
        }}
      >
        <span style={{ color: "#10b981", paddingRight: "5px" }}>
          {selectedSection.icon}
        </span>
        {selectedSection.label}
      </h2>
      <UserMenu email={email} />
    </Header>
  );
}

export default TopHeader;
