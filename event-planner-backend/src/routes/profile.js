// src/routes/profile.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

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

// Get profile
router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.userId, { attributes: { exclude: ["passwordHash"] } });
  res.json(user);
});

// Update profile
router.put("/", authMiddleware, async (req, res) => {
  const { name, bio, profilePicture } = req.body;
  const user = await User.findByPk(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = name || user.name;
  user.bio = bio || user.bio;
  user.profilePicture = profilePicture || user.profilePicture;
  await user.save();

  res.json(user);
});

module.exports = router;
