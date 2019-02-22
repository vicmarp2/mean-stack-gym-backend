const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const gymSchema = mongoose.Schema({
  codName: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  openingHours: { type: mongoose.Schema.Types.ObjectId, ref: "OpeningHours", required: true },
  coordinates: { type: mongoose.Schema.Types.ObjectId, ref: "Coordinates", required: true },
});

gymSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Gym", gymSchema);

