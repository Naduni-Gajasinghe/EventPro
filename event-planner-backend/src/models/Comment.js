// src/models/Comment.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Comment = sequelize.define("Comment", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Comment;
