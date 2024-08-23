const mongoose = require('mongoose');
const { Schema } = mongoose;
const SchoolSchema = new Schema({
    schoolname: {
        type: String,
        required: true,
    },
    schoolcode: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('school', SchoolSchema);