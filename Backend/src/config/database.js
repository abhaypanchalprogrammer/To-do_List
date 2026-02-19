const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://abhaypanchal2525_db_user:65aqvKv9LTyOFJM5@to-do-list.cyp0uiy.mongodb.net/ToDoList",
    )
    .then(() => {
      console.log("Database is connected successfully");
    });
};

module.exports = connectToDb;
