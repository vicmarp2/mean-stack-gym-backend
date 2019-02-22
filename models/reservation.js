const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  exactDate: { type: Date, required: true },
});

module.exports = mongoose.model("Reservation", reservationSchema);
