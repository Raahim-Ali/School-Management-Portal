import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./icon.css";

const UserMenu = ({ email }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const alphabet = () => {
    const firstLetter = email.charAt(0).toUpperCase();
    return firstLetter;
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ paddingRight: "20px" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button className="button" shape="circle">
          {alphabet()}
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
