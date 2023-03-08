const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nation",
    require: true,
  },
  position: {
    type: String,
    required: true,
  },
  goals: {
    type: Number,
    required: true,
  },
  isCaptain: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
