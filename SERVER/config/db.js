const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/localkart");
        console.log("Database Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;