const mongoose = require('mongoose');
const { Schema } = mongoose;
const StudentUserSchema = new Schema({
    systemid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    usertype: {
        type: String,
        default: "student"
    },
});
module.exports = mongoose.model('studentuser', StudentUserSchema);