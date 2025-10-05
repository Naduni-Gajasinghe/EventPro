// src/server.js
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");

// Import models
const Event = require("./models/Event");
const Comment = require("./models/Comment");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Define associations
Event.hasMany(Comment, { foreignKey: "eventId" });
Comment.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/events", require("./routes/events"));
app.use("/rsvp", require("./routes/rsvp"));
app.use("/profile", require("./routes/profile"));
app.use("/comment", require("./routes/comment")); // ✅ new comments route
app.use("/invites", require("./routes/invites"));



// Start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
