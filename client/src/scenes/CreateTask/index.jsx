import React, { useState } from "react";
import TaskForm from "../../components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch loading status from Redux state
  const isLoading = useSelector((state) => state.slice.loading.CreateTask);

  const [initialValues, setInitialValues] = useState({});

  // Function to handle form submission
  const onFinish = async (values) => {
    await dispatch(createTask(values)).then((res) => {
      const NotAnyErrorOccurred = res.payload.success;
      if (NotAnyErrorOccurred) {
        setInitialValues({});
        navigate("/");
      }
    });
  };

  return (
    <div>
      <TaskForm
        initialValues={initialValues}
        isEditing={false} // Flag indicating it's not editing
        onFinish={onFinish}
        loading={isLoading}
      />
    </div>
  );
};

export default CreateTask;
