const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendenceSchema = new Schema({
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
  students: {
    type: [
      {
        systemid: String,
        week: [
          {
            weekcode: String,
            attendance: [[String]],
          },
        ],
      },
    ],
    default: [
      {
        systemid: "",
        week: [
          {
            weekcode: "",
            attendance: [
              ["", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", ""]
            ],
          },
        ],
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("attendance", AttendenceSchema);