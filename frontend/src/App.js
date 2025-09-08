// App.js
import React, { useState, useEffect } from "react";
import api from "./api";
import ActionForm from "./ActionForm";
import ActionTable from "./ActionTable";
import "./App.css";

function App() {
  const [actions, setActions] = useState([]);
  const [editingAction, setEditingAction] = useState(null);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const res = await api.get("actions");
      setActions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch actions");
    }
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingAction) {
        await api.put(`actions/${editingAction.id}`, formData);
        setEditingAction(null);
      } else {
        await api.post("actions", formData);
      }
      fetchActions();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this action?")) return;
    try {
      await api.delete(`actions/${id}`);
      fetchActions();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (action) => setEditingAction(action);
  const handleCancelEdit = () => setEditingAction(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sustainability Actions</h1>
      <ActionForm
        onSubmit={handleAddOrUpdate}
        editingAction={editingAction}
        onCancel={handleCancelEdit}
      />
      <ActionTable actions={actions} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
