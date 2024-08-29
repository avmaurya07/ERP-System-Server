const mongoose = require("mongoose");
const { Schema } = mongoose;
const CordinatorSchema = new Schema({
  empid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  roles: {
    type: Object,
    default: {
      timetable: false,
      studentcontrol: false,
      batches: false,
      courses: false,
      classes: false,
    },
  },
  istempPassword: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  usertype: {
    type: String,
    default: "cordinator",
  },
});
module.exports = mongoose.model("cordinator", CordinatorSchema);
