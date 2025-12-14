const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); //Reference : Online tutorials (YouTube, StackOverflow)
    console.log("✔ MongoDB Atlas Connected");      //Concept clarification using ChatGPT
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
