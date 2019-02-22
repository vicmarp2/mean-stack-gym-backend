const mongoose = require("mongoose");

const coordinatesSchema = mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = mongoose.model("Coordinates", coordinatesSchema);
