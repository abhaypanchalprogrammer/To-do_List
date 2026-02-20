import React from "react";
import "./Table.scss";

const Table = ({ tasks, onDelete, setEditingTask, onStatusChange }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((todo, index) => (
            <tr key={index}>
              <td>{todo.title}</td>
              <td>{todo.task}</td>
              <td>
                <select
                  value={todo.status || "pending"}
                  onChange={(e) => onStatusChange(todo._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => setEditingTask(todo)}>Update</button>
                <button onClick={() => onDelete(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
