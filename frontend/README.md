# Sustainability Actions Frontend

This is the **React frontend** for the Sustainability Actions Tracker application. It allows users to **add, edit, and delete sustainability actions** and view them in a table with points and dates.

---

## Features

- Display a table of all sustainability actions.
- Add new actions with action name, date, and points.
- Edit existing actions directly via form.
- Delete actions with confirmation.
- Handles backend validation errors and displays alerts.
- Fully integrated with backend API using Axios and React Hooks.

---

## Tech Stack

- React (Functional Components)
- Axios for API calls
- useState and useEffect hooks
- Basic CSS for styling

---

## Installation & Setup

1. Navigate to the frontend folder:

```bash
cd frontend
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open the app in your browser:

```
http://localhost:3000
```

**Notes:**

* Make sure the backend server is running at `http://localhost:5000`.
* API calls are made to `/api/actions`.

---

## File Structure

```
frontend/
│
├─ src/
│   ├─ App.js          # Main React component
│   └─ api.js          # Axios instance for API calls (if applicable)
├─ package.json
└─ public/
```

---

## Usage

1. Fill out the form to **add a new action**.
2. Click **Edit** to populate the form and update an action.
3. Click **Delete** to remove an action.
4. Alerts show validation errors returned by the backend.

---

## Error Handling

* **400 Bad Request:** Form input is invalid (empty action, invalid date, negative points).
* **404 Not Found:** Trying to edit or delete an action that does not exist.
* **500 Internal Server Error:** Backend issue; alert will show “Internal server error.”

---