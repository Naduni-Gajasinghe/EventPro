// src/routes/rsvp.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const EventAttendee = require("../models/EventAttendee");

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

// RSVP (create or update)
router.post("/:eventId", authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const [rsvp, created] = await EventAttendee.findOrCreate({
      where: { eventId: req.params.eventId, userId: req.userId },
      defaults: { status },
    });

    if (!created) {
      rsvp.status = status;
      await rsvp.save();
    }

    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get RSVP summary for event
router.get("/:eventId", authMiddleware, async (req, res) => {
  try {
    const attendees = await EventAttendee.findAll({
      where: { eventId: req.params.eventId },
    });

    const summary = {
      Attending: attendees.filter((a) => a.status === "Attending").length,
      Maybe: attendees.filter((a) => a.status === "Maybe").length,
      "Not Going": attendees.filter((a) => a.status === "Not Going").length,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
