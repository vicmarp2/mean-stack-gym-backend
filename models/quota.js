const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const quotaSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  numberOfPayments: { type: Number, required: true },
  pricePerMonth: { type: Number, required: true },
  periodInMonths: { type: Number, required: true },
  isCardNeeded: { type: Number, required: true },
  cardPrice: { type: Number, required: true },
});

quotaSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Quota", quotaSchema);


