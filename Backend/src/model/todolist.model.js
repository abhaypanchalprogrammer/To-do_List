const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  task: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
