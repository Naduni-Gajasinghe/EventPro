// src/models/RSVP.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Event = require("./Event");

const RSVP = sequelize.define("RSVP", {
  status: {
    type: DataTypes.ENUM("Attending", "Maybe", "Not Going"),
    allowNull: false,
  },
});

// Relations
User.hasMany(RSVP);
RSVP.belongsTo(User);

Event.hasMany(RSVP);
RSVP.belongsTo(Event);

module.exports = RSVP;
