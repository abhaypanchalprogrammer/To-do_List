import React, { useState, useEffect } from "react";
import "./Input.scss";
import axios from "axios";

const Input = ({ tasks, setTasks, editingTask, setEditingTask, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    task: "",
  });

  // Pre-fill form when an editing task is selected
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        task: editingTask.task,
      });
    } else {
      setFormData({ title: "", task: "" });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.task) {
      alert("Please enter every detail");
      return;
    }

    if (editingTask) {
      // Update existing task
      await onUpdate(editingTask._id, formData);
    } else {
      // Create new task
      try {
        const res = await axios.post("http://localhost:5000/todo", formData);
        setTasks([...tasks, res.data.todo]);
        setFormData({ title: "", task: "" });
      } catch (err) {
        console.error("Error adding task:", err);
        alert("Failed to add task. Try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Your Task"
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
        />
        <button type="submit" disabled={!formData.title || !formData.task}>
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" onClick={() => setEditingTask(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;
