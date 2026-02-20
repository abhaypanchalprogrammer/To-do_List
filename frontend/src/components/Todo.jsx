import React, { useState, useEffect } from "react";
import Input from "./inputs/Input";
import Table from "./tables/Table";
import axios from "axios";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/todo").then((res) => {
      console.log(res.data);
      setTasks(res.data.todo);
    });
  }, []);

  const handleDelete = async (todoId) => {
    const res = await axios.delete(`http://localhost:5000/todo/${todoId}`);
    setTasks(tasks.filter((task) => task._id !== todoId));
    console.log(res.data.message);
  };

  const handleUpdate = async (todoId, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/todo/${todoId}`,
        updatedData
      );
      setTasks(
        tasks.map((task) => (task._id === todoId ? res.data.update : task))
      );
      setEditingTask(null);
      console.log(res.data.message);
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  const handleStatusChange = async (todoId, newStatus) => {
    try {
      // Find the existing task data so we don't overwrite title/task
      const task = tasks.find((t) => t._id === todoId);
      const res = await axios.put(`http://localhost:5000/todo/${todoId}`, {
        title: task.title,
        task: task.task,
        status: newStatus,
      });
      // Sync local state with the updated task from DB
      setTasks(
        tasks.map((t) => (t._id === todoId ? res.data.update : t))
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div>
      <Input
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        onUpdate={handleUpdate}
      />
      <Table
        tasks={tasks}
        onDelete={handleDelete}
        setEditingTask={setEditingTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Todo;
