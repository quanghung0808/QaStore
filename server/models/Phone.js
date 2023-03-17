const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  ram: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Phone", phoneSchema);
