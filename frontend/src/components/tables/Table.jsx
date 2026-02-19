import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.scss";
const Table = ({ tasks, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <tr>
          <th>Title</th>
          <th>Task</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {tasks.map((todo, index) => (
          <tr key={index}>
            <td>{todo.title}</td>
            <td>{todo.task}</td>
            <td>
              <select>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
            <td>
              <button>Update</button>
              <button onClick={() => onDelete(todo._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
