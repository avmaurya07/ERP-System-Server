const mongoose = require("mongoose");
const { Schema } = mongoose;
const BatchesSchema = new Schema({
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
  batchname: {
    type: String,
  },
  batchcode: {
    type: String,
    unique: true,
    required: true,
  },
  students: {
    type: Object,
    default:{},
    },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("batches", BatchesSchema);
