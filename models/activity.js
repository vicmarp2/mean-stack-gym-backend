const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const activitySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  events: { type: [mongoose.Schema.Types.ObjectId], ref: "Event", required: false }

});

activitySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Activity", activitySchema);

