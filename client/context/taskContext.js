import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

// const serverUrl = "http://localhost:8000/api/v1";
const serverUrl = "https://taskmanagement-h1da.onrender.com/api/v1";

export const TasksProvider = ({ children }) => {
  const userId = useUserContext().user._id;

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  // get tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      // Fixed endpoint to include /api/v1 and user-specific tasks
      const response = await axios.get(`${serverUrl}/tasks`);
      
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      } else {
        console.log("Unexpected response format:", response.data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error getting tasks", error.response?.data || error.message);
      setTasks([]);
    }
    setLoading(false);
  };

  // get task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error getting task", error.response?.data || error.message);
    }
    setLoading(false);
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      // Ensure the task has a user property set to the current user's ID
      const taskWithUser = { ...task, user: userId };
      const res = await axios.post(`${serverUrl}/task/create`, taskWithUser);

      console.log("Task created", res.data);
      
      // Make sure you're setting the right data in the state
      if (res.data) {
        setTasks([...tasks, res.data]);
        toast.success("Task created successfully");
      }
    } catch (error) {
      console.error("Error creating task", error.response?.data || error.message);
      toast.error("Failed to create task");
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);

      // update the task in the tasks array
      const newTasks = tasks.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });

      toast.success("Task updated successfully");
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task", error.response?.data || error.message);
      toast.error("Failed to update task");
    }
    setLoading(false);
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      // remove the task from the tasks array
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
      setTasks(newTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task", error.response?.data || error.message);
      toast.error("Failed to delete task");
    }
    setLoading(false);
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  // get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    if (userId) {
      getTasks();
    }
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        activeTasks,
        completedTasks,
        profileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};