const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  price: Number,
  type: String,
  location: String,
  beds: Number,
  baths: Number,
   image: {   
  type: String,
  default: "https://via.placeholder.com/600x400?text=No+Image"
},
  description: String
});

module.exports = mongoose.model("Property", PropertySchema);