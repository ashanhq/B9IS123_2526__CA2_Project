const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  price: Number,
  type: String,
  location: String,
  beds: Number,
  baths: Number,
  image: String
  description: String
});

module.exports = mongoose.model("Property", PropertySchema);