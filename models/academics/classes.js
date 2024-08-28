const mongoose = require("mongoose");
const { Schema } = mongoose;
const ClassesSchema = new Schema({
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
  },
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
  },
  batchname: {
    type: String,
  },
  batchcode: {
    type: String,
  },
  teachername: {
    type: String,
  },
  teachercode: {
    type: String,
  },
  classname: {
    type: String,
  },
  classcode: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("classes", ClassesSchema);
