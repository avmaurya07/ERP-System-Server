const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendanceSchema = new Schema({
  coursename: {
    type: String,
  },
  coursecode: {
    type: String,
  },
  academicyearcode: {
    type: String,
  },
  semestercode: {
    type: String,
  },
  systemid: {
    type: String,
  },
  weekcode: {
    type: String,
  },
  attendance: {
    type: [[String]],
    default: [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""]
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("attendance", AttendanceSchema);