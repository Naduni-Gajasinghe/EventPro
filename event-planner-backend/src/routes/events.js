// src/routes/events.js
const express = require("express");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const User = require("../models/User"); // to fetch commenter name
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const router = express.Router();

// Middleware: check JWT
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

// ✅ Create Event
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, date, category } = req.body;
  try {
    const event = await Event.create({
      title,
      description,
      date,
      category,
      createdBy: req.userId,
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Events (split into myEvents + otherEvents)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const myEvents = await Event.findAll({
      where: { createdBy: req.userId },
    });

    const otherEvents = await Event.findAll({
      where: { createdBy: { [Op.ne]: req.userId } }, // events NOT created by me
    });

    res.json({ myEvents, otherEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Event (only if owned by user)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, date, category } = req.body;
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.createdBy !== req.userId) {
      return res.status(403).json({ error: "Not authorized to update this event" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.category = category;
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Event (only if owned by user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id, createdBy: req.userId },
    });
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text required" });

    const comment = await Comment.create({
      text,
      userId: req.userId,
      eventId: req.params.id,
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments for event
router.get("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { eventId: req.params.id },
      include: [{ model: User, attributes: ["id", "name"] }],
      order: [["createdAt", "ASC"]],
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single event by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
