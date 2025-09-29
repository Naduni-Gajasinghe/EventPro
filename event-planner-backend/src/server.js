// src/server.js
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/events", require("./routes/events"));
app.use("/rsvp", require("./routes/rsvp"));
app.use("/profile", require("./routes/profile"));



// Start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});

