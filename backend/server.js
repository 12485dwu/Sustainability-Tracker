// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "actions.json");

// Middleware
app.use(cors());
app.use(express.json());

// ================= Helper Functions =================
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("Error reading JSON:", err);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing JSON:", err);
  }
};

// Validate action object
const validateAction = (data) => {
  const { action, date, points } = data;

  if (typeof action !== "string" || !action.trim()) {
    return "Action must be a non-empty string";
  }

  if (action.length > 255) {
    return "Action must not exceed 255 characters";
  }

  if (!date || isNaN(Date.parse(date))) {
    return "Invalid date";
  }

  const pointsNumber = Number(points);
  if (!Number.isInteger(pointsNumber) || pointsNumber < 0) {
    return "Points must be a non-negative integer";
  }

  return null; // valid
};

// ================= Routes =================

// GET all actions
app.get("/api/actions", (req, res) => {
  const actions = readData();
  res.json(actions);
});

// POST new action
app.post("/api/actions", (req, res) => {
  const error = validateAction(req.body);
  if (error) return res.status(400).json({ status: "error", message: error });

  const newAction = {
    id: Date.now(),
    action: req.body.action.trim(),
    date: req.body.date,
    points: Number(req.body.points),
  };

  const actions = readData();
  actions.push(newAction);
  writeData(actions);
  res.status(201).json(newAction);
});

// PUT update existing action
app.put("/api/actions/:id", (req, res) => {
  const actions = readData();
  const id = parseInt(req.params.id);
  const index = actions.findIndex((a) => a.id === id);

  if (index === -1)
    return res.status(404).json({ status: "error", message: "Action not found" });

  const updatedAction = {
    ...actions[index],
    action: req.body.action?.trim() ?? actions[index].action,
    date: req.body.date ?? actions[index].date,
    points: req.body.points !== undefined ? Number(req.body.points) : actions[index].points,
  };

  const error = validateAction(updatedAction);
  if (error) return res.status(400).json({ status: "error", message: error });

  actions[index] = updatedAction;
  writeData(actions);
  res.json(updatedAction);
});

// DELETE action
app.delete("/api/actions/:id", (req, res) => {
  const actions = readData();
  const id = parseInt(req.params.id);
  const updated = actions.filter((a) => a.id !== id);

  if (updated.length === actions.length)
    return res.status(404).json({ status: "error", message: "Action not found" });

  writeData(updated);
  res.json({ status: "success", message: "Action deleted" });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
