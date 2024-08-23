const mongoose = require("mongoose");
const { Schema } = mongoose;
const DepartmentSchema = new Schema({
  departmentname: {
    type: String,
  },
  schoolcode: {
    type: String,
    required: true,
  },
  departmentcode: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("department", DepartmentSchema);
