const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const gymSchema = mongoose.Schema({
  codName: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  openingHours: {
    mondayToFriday: { type: String, required: true },
    weekend: { type: String, required: true },
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  });

gymSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Gym", gymSchema);

