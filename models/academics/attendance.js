const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendenceSchema = new Schema({
  coursename: {
    type: String,
  },
  coursecode: {
    type: String,
  },
  students: {
    type: [
      {
        systemid: String,
        week: [
          {
            weekcode: String,
            attendance: [[Boolean]],
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
              [null, null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null, null]
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