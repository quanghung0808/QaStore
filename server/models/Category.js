const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Category", CategoryScheme);
