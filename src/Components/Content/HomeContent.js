import React, { useEffect } from "react";
import { theme, Layout } from "antd";
import { Card, Col, Row } from "antd";
import {
  FormOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  PoundOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
  EditOutlined,
  PayCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./HomeContent.css";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

export default function HomeContent({ onSectionChange }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect triggered");
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
  }, [navigate]);

  const authToken = localStorage.getItem("authToken");
  const isLoading = !authToken;

  const handleCardClick = () => {
    navigate(`/app/subjects`);
    const subjectSection = {
      key: "2",
      icon: <BookOutlined />,
      label: "Subjects",
    };
    onSectionChange(subjectSection);
  };

  const handleCardClick2 = () => {
    navigate(`/app/students`);
    const subjectSection = {
      key: "3",
      icon: <TeamOutlined />,
      label: "Students",
    };
    onSectionChange(subjectSection);
  };

  const handleCardClick3 = () => {
    navigate(`/app/registers`);
    const subjectSection = {
      key: "4",
      icon: <FileTextOutlined />,
      label: "Registers",
    };
    onSectionChange(subjectSection);
  };

  return (
    <>
      <div className={`app ${isLoading ? "loading" : ""}`}>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Row gutter={16}>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  onClick={() => handleCardClick()}
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#10b981" }}
                    >
                      <FormOutlined />
                    </div>
                    <div className="title-text">Create Subject</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  onClick={() => handleCardClick2()}
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#76b83f" }}
                    >
                      <FolderAddOutlined />
                    </div>
                    <div className="title-text">Create Student</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  onClick={() => handleCardClick3()}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#ff4d4f" }}
                    >
                      <UsergroupAddOutlined />
                    </div>
                    <div className="title-text">Create Register</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#eb2f96" }}
                    >
                      <BookOutlined />
                    </div>
                    <div className="title-text">Show Result</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#1677ff" }}
                    >
                      <FileAddOutlined />
                    </div>
                    <div className="title-text">Assign Subject</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#91caff" }}
                    >
                      <PoundOutlined />
                    </div>
                    <div className="title-text">Fee List</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#594dff" }}
                    >
                      <EditOutlined />
                    </div>
                    <div className="title-text">Assign Marks</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#576f42" }}
                    >
                      <PayCircleOutlined />
                    </div>
                    <div className="title-text">Payment</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: "25px" }}>
                <Card
                  bordered={false}
                  className="custom-card"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.2)",
                    height: "150px",
                  }}
                >
                  <div className="title-wrapper">
                    <div
                      className="circle-icon-bg"
                      style={{ backgroundColor: "#eb1bcb" }}
                    >
                      <CommentOutlined />
                    </div>
                    <div className="title-text">Chat</div>
                  </div>
                  <br />
                  <span className="arrow-icon">
                    <ArrowRightOutlined />
                  </span>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </>
  );
}
