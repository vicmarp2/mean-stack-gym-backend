const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventSchema = require("./event");

const activitySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event", required: false }],

});

activitySchema.plugin(uniqueValidator);

// activitySchema.pre('save', function(next){
//   eventSchema.insertMany(this.events, function(err, res){
//       if(err) throw err;
//       next();
//   })
// });

// activitySchema.pre('remove', function(next){
//   Event
//   eventSchema.deleteMany(this.events, function(err, res){
//       if(err) throw err;
//       next();
//   })
// });
module.exports = mongoose.model("Activity", activitySchema);

