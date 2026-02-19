import React, { useState, useEffect } from "react";
import Input from "./inputs/Input";
import Table from "./tables/Table";
import axios from "axios";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  function fetchData() {
    axios.get("http://localhost:5000/todo").then((res) => {
      console.log(res.data);
      setTasks(res.data.todo);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (todoId) => {
    const res = await axios.delete(`http://localhost:5000/todo/${todoId}`);

    setTasks(tasks.filter((task) => task._id !== todoId));
    console.log(res.data.message);
  };
  return (
    <div>
      <Input tasks={tasks} setTasks={setTasks} />
      <Table tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};

export default Todo;
