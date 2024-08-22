require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI || "mongodb+srv://avmaurya07:avmaurya07@erp-system.nxbx9ml.mongodb.net/?retryWrites=true&w=majority&appName=erp-system"
const connectToMongo = () => {
    mongoose.connect(mongoURI)
}
module.exports = connectToMongo;