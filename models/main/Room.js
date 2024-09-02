const mongoose = require("mongoose");
const { Schema } = mongoose;
const RoomSchema = new Schema({
  departmentname: {
    type: String,
    required: true,
  },
  schoolname: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("room", RoomSchema);
