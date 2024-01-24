import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import "./styles/styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");

  useEffect(() => {
    // Fetch tasks from the API or any other data source
    // For simplicity, let's assume there's a mock API endpoint /tasks
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (newTask) => {
    // Implement logic to add a new task to the API or data source
    // For simplicity, let's assume there's a mock API endpoint /tasks
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]))
      .catch((error) => console.error("Error adding task:", error));
  };

  const updateTask = (taskId) => {
    // Implement logic to update the status of a task in the API or data source
    // For simplicity, let's assume there's a mock API endpoint /tasks/:id/status
    fetch(`/tasks/${taskId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? { ...task, status: getNextStatus(task.status) }
            : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const deleteTask = (taskId) => {
    // Implement logic to delete a task from the API or data source
    // For simplicity, let's assume there's a mock API endpoint /tasks/:id
    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const getNextStatus = (currentStatus) => {
    // Implement logic to determine the next status based on the current status
    // For simplicity, let's assume a linear flow: "To Do" -> "In Progress" -> "Done"
    const statusOrder = ["To Do", "In Progress", "Done"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    return statusOrder[nextIndex];
  };

  const filteredTasks =
    filteredStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filteredStatus);

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskForm onAddTask={addTask} />
      <TaskFilter onFilterChange={setFilteredStatus} />
      <TaskList
        tasks={filteredTasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
