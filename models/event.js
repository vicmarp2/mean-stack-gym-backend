const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  activityName: { type: String, required: true },
  startHour: { type: Number, required: true },
  endHour: { type: Number, required: true },
  dayOfWeek: { type: Number, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
