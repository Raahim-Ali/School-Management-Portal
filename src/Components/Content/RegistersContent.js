import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Card,
  Input,
  Modal,
  Select,
  Button,
  Checkbox,
} from "antd";

import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./RegistersContent.css";
const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);

export const getAllRegisters = async (setData) => {
  try {
    const response = await axios.get("/register");
    setData(response.data.data);
    console.log("response.data.data", response.data.data);
  } catch (error) {
    console.error("Error uploading course:", error);
  }
};

const RegistersContent = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [RegisterName, setRegisterName] = useState("");
  const [displayregister, setDisplayRegister] = useState(false);
  const [displaystudent, setDisplayStudent] = useState(false);
  const [displaysubject, setDisplaySubject] = useState(false);
  const [Role, setRole] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [email, setEmail] = useState("");

  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {};

  const closeDeleteModal = () => {
    setRecordToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 270,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
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
    getAllRegisters(setTableData);
  }, []);

  const handleDelete = (registerId) => {
    axios
      .delete(`http://192.168.0.117:8000/api/register/${registerId}`)
      .then(() => {
        const updatedData = tableData.filter(
          (register) => register._id !== registerId
        );
        setTableData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleCreateStudent = async () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const checksubject = () => {
    setDisplaySubject(true);
  };
  const checkstudent = () => {
    setDisplayStudent(true);
  };
  const checkregister = () => {
    setDisplayRegister(true);
  };

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleConfirm = async () => {
    const register = {
      name: RegisterName,
      email: email,
      role: Role,

      permission_settings: {
        display_register: displayregister,
        display_student: displaystudent,
        display_subject: displaysubject,
      },
    };

    try {
      const response = await axios.post("/register", register);
      const createdRegister = response.data.data;
      setTableData((prevTableData) => [...prevTableData, createdRegister]);
      setIsModalOpen(false);
      getAllRegisters(setTableData);
      setRegisterName("");
      setRole("");
    } catch (error) {
      console.error("Error uploading student:", error);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRegisterName("");
    setRole("");
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
            Create Register
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
          <label style={{ marginTop: "30px" }}>Role</label>
          <Select
            className="register-select"
            value={Role}
            onChange={handleRoleChange}
          >
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
          </Select>
        </div>
        <div>
          <label style={{ marginTop: "10px" }}>Name</label>
          <Input
            value={RegisterName}
            onChange={(e) => setRegisterName(e.target.value)}
            placeholder="Enter Name"
            className="custom-input"
          />
        </div>
        <div>
          <label style={{ marginTop: "10px" }}>Email</label>
          <Input
            value={email}
            onChange={(f) => setEmail(f.target.value)}
            placeholder="Enter Email"
            className="custom-input"
          />
        </div>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <Checkbox onClick={checksubject} style={{ marginRight: "40px" }}>
            Display Subject
          </Checkbox>
          <Checkbox onClick={checkstudent} style={{ marginRight: "40px" }}>
            Display Student
          </Checkbox>
          <Checkbox onClick={checkregister}>Display Register</Checkbox>
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
        title="Delete Register"
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
            Do you want to delete this Register?
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

export default RegistersContent;
