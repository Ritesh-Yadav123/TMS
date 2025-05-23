const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("./db");

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/launch");
  }
}

// Route to render the 'task' EJS template
router.get("/", isAuthenticated, (req, res) => {
  res.render("task"); // Ensure 'task.ejs' exists in your 'views' directory
});

module.exports = router;

// Get all tasks for the logged-in user
// router.get("/", isAuthenticated, (req, res) => {
//   const query = "SELECT * FROM tasks WHERE user = ?";
//   db.query(query, [req.session.user], (err, results) => {
//     if (err) {
//       console.error("Error fetching tasks:", err);
//       return res.status(500).send("Server error");
//     }
//     res.json(results);
//   });
// });

// // Create a new task
// router.post("/create", isAuthenticated, (req, res) => {
//   const { title, description, due_date } = req.body;
//   const query = "INSERT INTO tasks (user, title, description, due_date) VALUES (?, ?, ?, ?)";
//   db.query(query, [req.session.user, title, description, due_date], (err, result) => {
//     if (err) {
//       console.error("Error creating task:", err);
//       return res.status(500).send("Server error");
//     }
//     res.send("Task created successfully!");
//   });
// });

// router.get('/task',(res,re))

// // Delete a task
// router.post("/delete/:id", isAuthenticated, (req, res) => {
//   const { id } = req.params;
//   const query = "DELETE FROM tasks WHERE id = ? AND user = ?";
//   db.query(query, [id, req.session.user], (err, result) => {
//     if (err) {
//       console.error("Error deleting task:", err);
//       return res.status(500).send("Server error");
//     }
//     res.send("Task deleted successfully!");
//   });
// });

// // Update a task
// router.post("/update/:id", isAuthenticated, (req, res) => {
//   const { id } = req.params;
//   const { title, description, due_date } = req.body;
//   const query = "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ? AND user = ?";
//   db.query(query, [title, description, due_date, id, req.session.user], (err, result) => {
//     if (err) {
//       console.error("Error updating task:", err);
//       return res.status(500).send("Server error");
//     }
//     res.send("Task updated successfully!");
//   });
// });