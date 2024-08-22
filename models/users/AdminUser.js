const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdminUserSchema = new Schema({
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
        required: true
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
        default: "admin"
    },
});
module.exports = mongoose.model('adminuser', AdminUserSchema);