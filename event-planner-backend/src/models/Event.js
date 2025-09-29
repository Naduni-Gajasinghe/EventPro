// src/models/Event.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Event = sequelize.define("Event", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATE,
  category: DataTypes.STRING, // NEW ✅ category field
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Event;
