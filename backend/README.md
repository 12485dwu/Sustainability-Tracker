# Sustainability Actions Backend

This is the **Node.js + Express backend** for the Sustainability Actions Tracker. It provides a **RESTful API** to store, retrieve, update, and delete sustainability actions.

---

## Features

- RESTful API endpoints for CRUD operations:
  - GET all actions
  - POST new action
  - PUT update action
  - DELETE action
- Validates input JSON to ensure data integrity.
- Structured error handling with meaningful responses:
  - 400 – Bad Request
  - 404 – Not Found
  - 500 – Internal Server Error
- Stores data in a local JSON file (`actions.json`).

---

## Tech Stack

- Node.js
- Express
- CORS
- File-based JSON storage (no database required)

---

## Installation & Setup

1. Navigate to the backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install express cors
```

3. Start the server:

```bash
node server.js
```

4. The backend runs at:

```
http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint           | Description            | Response Example                                                        |
| ------ | ------------------ | ---------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/actions`     | Get all actions        | `[{"id":1,"action":"Recycle","date":"2025-09-06","points":10}]`         |
| POST   | `/api/actions`     | Add a new action       | `{"id":123456,"action":"Recycle","date":"2025-09-06","points":10}`      |
| PUT    | `/api/actions/:id` | Update existing action | `{"id":123456,"action":"Recycle More","date":"2025-09-07","points":15}` |
| DELETE | `/api/actions/:id` | Delete action by ID    | `{"status":"success","message":"Action deleted"}`                       |

---

## Validation Rules

* `action` must be a non-empty string.
* `date` must be a valid date.
* `points` must be a non-negative number.

---

## Error Handling

* **400 Bad Request – Invalid input data:**

```json
{ "status": "error", "message": "Invalid action data" }
```

* **404 Not Found – Resource not found:**

```json
{ "status": "error", "message": "Action not found" }
```

* **500 Internal Server Error – Unexpected server failure:**

```json
{ "status": "error", "message": "Internal server error" }
```

---

## Folder Structure

```
backend/
│
├─ node_modules/ # Installed dependencies
│
├─ actions.json # JSON file storing sustainability actions
├─ server.js # Main Express server
│
├─ package.json # Project metadata and dependencies
├─ package-lock.json # Lockfile for dependency versions
└─ README.md # Documentation for backend

---

## Testing

Use **Postman** or frontend to test:

1. **400 Bad Request:**

   * POST or PUT with invalid data (empty action, invalid date, negative points).

2. **404 Not Found:**

   * DELETE or PUT with non-existent ID.
   * Access an invalid route.

3. **500 Internal Server Error:**

   * Temporarily throw an error in a backend route:

```javascript
app.get("/api/actions", (req, res) => {
  throw new Error("Test 500");
});
```

* Access `/api/actions` → JSON 500 response.

---
