// src/routes/invites.js
const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const router = express.Router();

// Middleware
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

// Invite route
router.post("/:eventId", authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const event = await Event.findByPk(req.params.eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    // 1️⃣ Create Ethereal test account
    const testAccount = await nodemailer.createTestAccount();
    console.log("Ethereal test account:", testAccount);

    // 2️⃣ Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // 3️⃣ Verify connection
    await transporter.verify();
    console.log("SMTP Server is ready to send messages");

    // 4️⃣ Send mail
    const info = await transporter.sendMail({
      from: '"EventPro Invites" <no-reply@eventpro.com>',
      to: email,
      subject: `Invitation to ${event.title}`,
      text: `You are invited to ${event.title} on ${event.date}.`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({
      message: "Invitation sent!",
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.error("Invite error:", err); // 👈 full error in console
    res.status(500).json({ error: "Failed to send invite", details: err.message });
  }
});


module.exports = router;
