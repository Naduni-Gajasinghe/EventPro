// src/routes/comments.js
const express = require("express");
const Comment = require("../models/Comment");
const Event = require("../models/Event");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to check JWT
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// Add comment to an event
router.post("/:eventId", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,  // ✅ must match model field
      eventId: req.params.eventId,
      userId: req.userId,
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments for an event
router.get("/:eventId", authMiddleware, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { eventId: req.params.eventId },
      include: [{ model: User, attributes: ["id", "name"] }],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
