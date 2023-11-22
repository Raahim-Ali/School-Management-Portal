import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Card, Input, Modal, Select, Button, Alert } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./SubjectsContent.css";
const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);

export const getAllCourse = async (setData) => {
  try {
    const response = await axios.get("/subjects");
    setData(response.data.data);
  } catch (error) {
    console.error("Error uploading course:", error);
  }
};

const SubjectsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [editsubjectName, setEditSubjectName] = useState({ subjectName });
  const [status, setStatus] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setRecordToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 320,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      render: (status) => (
        <span
          style={{
            display: "inline-block",
            padding: "4px 8px",
            backgroundColor: status === "enable" ? "#10b981" : "red",
            color: "white",
            borderRadius: "4px",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <a
            style={{ color: "#10b981", fontWeight: "bold" }}
            onClick={() => handleEdit(record._id)}
          >
            <EditOutlined />
          </a>
          <a
            style={{ color: "red", fontWeight: "bold" }}
            onClick={() => openDeleteModal(record)}
          >
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllCourse(setTableData);
  }, []);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = (courseId) => {
    axios
      .delete(`http://192.168.0.117:8000/api/subjects/${courseId}`)
      .then(() => {
        const updatedData = tableData.filter(
          (course) => course._id !== courseId
        );
        setTableData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleCreateSubject = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    const course = {
      name: subjectName,
      status: status || undefined,
    };

    try {
      const created_subject = await axios.post("/subjects", course);
      console.log("created_", created_subject);
      setTableData([...tableData, created_subject.data.data]);
      setIsModalOpen(false);
      getAllCourse(setTableData);
      setSubjectName("");
      setStatus("");
    } catch (error) {
      console.error("Error uploading course:", error);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  return (
    <div className="subjects-content">
      <Card className="subject-card">
        <div className="search-button-container">
          <Search
            placeholder="Search"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          <button className="btn-createsubject" onClick={handleCreateSubject}>
            Create Subject
          </button>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </Card>
      <Modal
        title="Create Subject"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <div>
          <label style={{ marginTop: "10px" }}>Name:</label>
          <Input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter name"
            className="custom-input"
          />
        </div>
        <div>
          <label style={{ marginTop: "30px" }}>Status:</label>
          <Select
            className="status-select"
            value={status}
            onChange={handleStatusChange}
          >
            <Option value="enable">Enable</Option>
            <Option value="disable">Disable</Option>
          </Select>
        </div>
        <div className="modal-buttons">
          <Button className="custom-button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            style={{
              marginLeft: 10,
              backgroundColor: "#10b981",
            }}
            onClick={handleConfirm}
            className="custom-button"
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        title="Edit Subject"
        visible={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <div>
          <label style={{ marginTop: "10px" }}>Name:</label>
          <Input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter Name"
            className="custom-input"
          />
        </div>
        <div>
          <label style={{ marginTop: "30px" }}>Status:</label>
          <Select
            className="status-select"
            value={status}
            onChange={handleStatusChange}
          >
            <Option value="enable">Enable</Option>
            <Option value="disable">Disable</Option>
          </Select>
        </div>
        <div className="modal-buttons">
          <Button className="custom-button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            style={{
              marginLeft: 10,
              backgroundColor: "#10b981",
            }}
            onClick={handleConfirm}
            className="custom-button"
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        title="Delete Subject"
        visible={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={null}
        className="custom-modal"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <ExclamationCircleOutlined
            style={{ marginRight: "10px", color: "red" }}
          />
          <p style={{ fontWeight: "bold", margin: 0 }}>
            Do you want to delete this Subject?
          </p>
        </div>
        <div className="modal-buttons">
          <Button className="custom-button" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            style={{
              marginLeft: 10,
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => {
              if (recordToDelete) {
                handleDelete(recordToDelete._id);
              }
              closeDeleteModal();
            }}
            className="custom-button"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SubjectsContent;
