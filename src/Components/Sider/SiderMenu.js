import React from "react";
import "./Sider.css";
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export const menuItems = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    to: "/app/home",
  },
  {
    key: "2",
    icon: <BookOutlined />,
    label: "Subjects",
    to: "/app/subjects",
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Students",
    to: "/app/students",
  },
  {
    key: "4",
    icon: <FileTextOutlined />,
    label: "Registers",
    to: "/app/registers",
  },
];

function SiderMenu({ onSectionChange, selectedSection }) {
  const navigate = useNavigate();
  return (
    <Sider
      className="custom-sider"
      width="250px"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="welcome">
        <UserOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
        Welcome!
      </div>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        className="custom-menu"
        selectedKeys={[selectedSection.key]}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => {
              onSectionChange(item);
              navigate(item.to);
            }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
