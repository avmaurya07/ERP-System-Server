const mongoose = require("mongoose");
const { Schema } = mongoose;
const SemesterSchema = new Schema({
  academicyearname: {
    type: String,
  },
  academicyearcode: {
    type: String,
  },
  semestername: {
    type: String,
  },
  semestercode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("semester", SemesterSchema);
