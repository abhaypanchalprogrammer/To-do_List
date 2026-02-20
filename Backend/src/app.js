const express = require("express");
const cors = require("cors");
const todoModel = require("./model/todolist.model");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/todo", async (req, res) => {
  const { title, task, status } = req.body;
  const todo = await todoModel.create({
    title,
    task,
    status,
  });
  res.status(201).json({
    message: "Task Created successfully",
    todo,
  });
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const deleteToDo = await todoModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Task is Deleted",
    deleteToDo,
  });
});
app.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const { title, task, status } = req.body;
  const update = await todoModel.findByIdAndUpdate(
    id,
    { title, task, status },
    { new: true },
  );
  res.status(200).json({
    message: "Task Updated",
    update,
  });
});

app.get("/todo", async (req, res) => {
  const todo = await todoModel.find();
  res.status(200).json({
    message: "Data Retrieved Successfully",
    todo,
  });
});
module.exports = app;
