import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Card, Input, Modal, Select, Button, Alert } from "antd";

import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./StudentsContent.css";
const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);

export const getAllStudents = async (setData) => {
  try {
    const response = await axios.get("/students");
    setData(response.data.data);
    console.log("response.data.data", response.data.data);
  } catch (error) {
    console.error("Error uploading course:", error);
  }
};

const StudentsContent = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [status, setStatus] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [dropdownSubjects, setDropdownSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");

  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setRecordToDelete(null);
    setIsDeleteModalOpen(false);
  };
  const handleEdit = () => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 270,
    },
    {
      title: "Roll Number",
      dataIndex: "roll_number",
      width: 150,
    },
    {
      title: "Subject Name",
      dataIndex: "subject_name",
      key: "name",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "subject_status",
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
    getAllStudents(setTableData);
  }, []);

  const handleDelete = (studentId) => {
    axios
      .delete(`http://192.168.0.117:8000/api/students/${studentId}`)
      .then(() => {
        const updatedData = tableData.filter(
          (student) => student._id !== studentId
        );
        setTableData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleCreateStudent = async () => {
    setIsModalOpen(true);

    try {
      const response = await axios.get("/subjects");
      setDropdownSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    const selectedSubject = dropdownSubjects.find(
      (subject) => subject._id === subjectId
    );

    const student = {
      name: subjectName,
      subject_name: selectedSubject ? selectedSubject.name : "",
      roll_number: rollNumber,
      subjects_id: subjectId,
      subject_status: status || undefined,
    };

    console.log("student", student);

    try {
      const response = await axios.post("/students", student);
      const createdStudent = response.data.data;
      setTableData((prevTableData) => [...prevTableData, createdStudent]);
      setIsModalOpen(false);
      getAllStudents(setTableData);
      setSubjectName("");
      setRollNumber("");
      setStatus("");
      setSubjectId("");
    } catch (error) {
      console.error("Error uploading student:", error);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          <button className="btn-createsubject" onClick={handleCreateStudent}>
            Create Student
          </button>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </Card>
      <Modal
        title="Create Student"
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
            placeholder="Enter Student Name"
            className="custom-input"
          />
        </div>
        <div>
          <label style={{ marginTop: "10px" }}>Roll Number:</label>
          <Input
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Student Roll Number"
            className="custom-input"
          />
        </div>
        <div>
          <label style={{ marginTop: "30px" }}>Subjects:</label>
          <Select
            defaultValue="Select Subject"
            style={{ width: "475px" }}
            onChange={(value) => {
              setSubjectId(value);
            }}
          >
            {dropdownSubjects.map((subject) => (
              <Option key={subject._id} value={subject._id}>
                {subject.name}
              </Option>
            ))}
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
            Do you want to delete this Student?
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

export default StudentsContent;
