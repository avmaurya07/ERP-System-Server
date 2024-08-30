require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoURI = process.env.mongoURI;
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToMongo = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

module.exports = connectToMongo;