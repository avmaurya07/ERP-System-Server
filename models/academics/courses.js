const mongoose = require("mongoose");
const { Schema } = mongoose;
const CoursesSchema = new Schema({
  schoolname: {
    type: String,
  },
  schoolcode: {
    type: String,
  },
  departmentname: {
    type: String,
  },
 departmentcode: {
    type: String,
  },
  coursename: {
    type: String,
  },
  coursecode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("courses", CoursesSchema);
