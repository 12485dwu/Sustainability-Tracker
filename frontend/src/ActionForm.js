// ActionForm.js
import React, { useState, useEffect } from "react";

function ActionForm({ onSubmit, editingAction, onCancel }) {
  const [form, setForm] = useState({ action: "", date: "", points: 0 });

  useEffect(() => {
    if (editingAction) {
      setForm({
        action: editingAction.action,
        date: editingAction.date,
        points: editingAction.points,
      });
    } else {
      setForm({ action: "", date: "", points: 0 });
    }
  }, [editingAction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "points" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.action.trim()) return alert("Action cannot be empty");
    if (!form.date) return alert("Date is required");
    if (!Number.isInteger(form.points) || form.points < 0)
      return alert("Points must be a non-negative integer");

    onSubmit(form);
    setForm({ action: "", date: "", points: 0 });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="action"
        placeholder="Action"
        value={form.action}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="points"
        placeholder="Points"
        value={form.points}
        onChange={handleChange}
        min="0"
        required
      />
      <button type="submit">{editingAction ? "Update Action" : "Add Action"}</button>
      {editingAction && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ActionForm;
