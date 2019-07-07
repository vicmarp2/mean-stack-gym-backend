const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const courseSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Course", courseSchema);


