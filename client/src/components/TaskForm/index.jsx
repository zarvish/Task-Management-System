import React from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import "./styles.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ initialValues, onFinish, isEditing, isLoading }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <div className="create-task-container">
      {/* Button to navigate back */}
      <Button type="primary" onClick={() => navigate("/")}>
        <ArrowLeftOutlined />
        Back
      </Button>
      {/* Title based on whether editing or creating task */}
      <h1 className="create-task-title">
        {isEditing ? "Edit Task" : "Create Task"}
      </h1>

      {/* Form component for task details */}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        {/* Title input field */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input placeholder="Enter title" className="input-field" />
        </Form.Item>
        {/* Description input field */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input.TextArea
            placeholder="Enter description"
            rows={4}
            className="input-field"
          />
        </Form.Item>
        {/* Due Date datepicker */}
        <Form.Item
          rules={[{ required: true, message: "Please enter the date!" }]}
          name="dueDate"
          label="Due Date"
        >
          <DatePicker value={initialValues?.dueDate} className="input-field" />
        </Form.Item>
        {/* Status selection for editing */}
        {isEditing && (
          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "Completed", label: "Completed" },
                { value: "Not Completed", label: "Not Completed" },
              ]}
            />
          </Form.Item>
        )}
        {/* Submit button */}
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="submit-button"
          >
            {isEditing ? "Update Task" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
