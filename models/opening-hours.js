const mongoose = require("mongoose");

const openingHoursSchema = mongoose.Schema({
  mondayToFriday: { type: String, required: true },
  weekend: { type: String, required: true },
});

module.exports = mongoose.model("OpeningHours", openingHoursSchema);
 