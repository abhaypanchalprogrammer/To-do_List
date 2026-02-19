import React, { useState } from "react";
import "./Input.scss";
import axios from "axios";

const Input = ({ tasks, setTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    task: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.task) {
      alert("Please enter every detail");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/todo", formData);
      setTasks([...tasks, res.data.todo]);
      setFormData({ title: "", task: "" });
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task. Try again.");
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Input;
