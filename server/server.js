require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// API
app.use("/api/users", require("./routes/users/usersRoutes"));
app.use("/api/tasks", auth, require("./routes/tasks/tasksRoutes"));


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
