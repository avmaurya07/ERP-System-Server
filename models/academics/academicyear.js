const mongoose = require("mongoose");
const { Schema } = mongoose;
const AcademicyearSchema = new Schema({
  academicyearname: {
    type: String,
  },
  academicyearcode: {
    type: String,
    unique:true,
    required:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("academicyear", AcademicyearSchema);
