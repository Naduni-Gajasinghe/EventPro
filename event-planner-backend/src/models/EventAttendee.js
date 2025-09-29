// src/models/EventAttendee.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Event = require("./Event");

const EventAttendee = sequelize.define("EventAttendee", {
  status: {
    type: DataTypes.ENUM("Attending", "Maybe", "Not Going"),
    defaultValue: "Maybe",
  },
});

// Relationships
Event.belongsToMany(User, { through: EventAttendee, foreignKey: "eventId" });
User.belongsToMany(Event, { through: EventAttendee, foreignKey: "userId" });

module.exports = EventAttendee;
