const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// REGISTER ROUTES
const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);