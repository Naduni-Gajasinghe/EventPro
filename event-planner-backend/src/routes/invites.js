// src/routes/invites.js
const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// Invite user
router.post("/:eventId", authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const invite = await Invite.create({
      eventId: req.params.eventId,
      email,
    });

    // Send email (basic setup)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "You're invited to an event!",
      text: `You have been invited to event ID ${req.params.eventId}.`,
    });

    res.json({ message: "Invitation sent", invite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
