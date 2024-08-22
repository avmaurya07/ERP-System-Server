const mongoose = require("mongoose");
const { Schema } = mongoose;
const LogsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  usertype: {
    type: String,
  },
  logdata: {
    type: String,
  },
  logtype: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model("logs", LogsSchema);
