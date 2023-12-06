import React, { useEffect, useState } from "react";
import { Popconfirm, Table, Tag, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { deleteTask, fetchTasks } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.slice.data.tasks);

  // Function to navigate to the edit task page
  const edit = (record) => {
    navigate(`/edit-task`, { state: { initialValues: record } });
  };

  // module to track whether the screen is in mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define columns for the tasks table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: isMobile ? "100%" : "20%",
      className: "title-column",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      width: "10%",
      render: (_, record) => {
        return <>{dayjs(record?.dueDate).format("DD MMM YYYY")}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (_, record) => {
        return (
          <Tag
            icon={
              record?.status == "Completed" ? (
                <CheckCircleOutlined />
              ) : (
                <CloseCircleOutlined />
              )
            }
            color={record?.status == "Completed" ? "success" : "error"}
          >
            {record?.status}
          </Tag>
        );
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: "10px", marginBottom: "10px" }}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this task?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // Function to handle task deletion
  const handleDelete = async (record) => {
    await dispatch(deleteTask(record._id));
    await dispatch(fetchTasks());
  };

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => navigate("/create-task")}
        style={{ marginBottom: 16 }}
      >
        + Create New Task
      </Button>

      {/* Table displaying tasks */}
      <Table
        className="table"
        bordered
        dataSource={tasks}
        columns={columns}
        rowClassName="editable-row"
        pagination
      />
    </div>
  );
};

export default Home;
