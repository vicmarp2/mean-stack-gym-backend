const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  quota: { type: mongoose.Schema.Types.ObjectId, ref: "Quota", required: true },
  purchaseDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  contactNumber: { type: String, required: false },
  birthdate: { type: Date, required: false },
  address: { type: String, required: false },
  postalCode: { type: String, required: false },
  city: { type: String, required: false },
  iban: { type: String, required: false },
  isAdmin: {type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

