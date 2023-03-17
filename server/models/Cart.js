const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartScheme = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: String,   
    required: true,
  },
  user_id:{
    type: String,   
    required: true,
  },
  // store_id:{
  //   type: String,   
  //   required: true,
  // }
  
});


module.exports = mongoose.model("Cart", CartScheme);