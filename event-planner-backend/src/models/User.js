// src/models/User.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  passwordHash: DataTypes.STRING,
  bio: DataTypes.STRING,          // ✅ new
  profilePicture: DataTypes.STRING,
});

module.exports = User;
