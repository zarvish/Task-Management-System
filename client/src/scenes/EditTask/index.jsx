import React from "react";
import TaskForm from "../../components/TaskForm";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../utils/apiCalls";

const EditTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.slice.loading.updateTask);
  const initialValues = location?.state?.initialValues || {};

  // Format due date using dayjs library so that default value can be setted to ant design datepicker
  initialValues.dueDate = dayjs(initialValues.dueDate);

  // Function to handle form submission for updating a task
  const onFinish = async (values) => {
    values = {
      ...values,
      dueDate: new Date(values.dueDate),
      id: initialValues._id,
    };

    // Dispatch API call to update the task
    await dispatch(updateTask(values)).then((res) => {
      console.log(res);
      if (res?.payload?.success) {
        navigate("/");
      }
    });
  };
  return (
    <div>
      <TaskForm
        isEditing={true} // Flag indicating it's in editing mode
        onFinish={onFinish}
        initialValues={initialValues}
        loading={isLoading}
      />
    </div>
  );
};

export default EditTask;
