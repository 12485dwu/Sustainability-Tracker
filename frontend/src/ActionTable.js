// ActionTable.js
import React from "react";

function ActionTable({ actions, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Action</th>
          <th>Date</th>
          <th>Points</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {actions.length === 0 ? (
          <tr>
            <td colSpan="5">No actions found</td>
          </tr>
        ) : (
          actions.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.action}</td>
              <td>{a.date}</td>
              <td>{a.points}</td>
              <td>
                <button onClick={() => onEdit(a)}>Edit</button>{" "}
                <button onClick={() => onDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ActionTable;
