const express = require("express");
const cart_route = express.Router();
const {
    add_to_cart,
    getCart,
    removeItem
  } = require("../controller/CartController");
const bodyParser = require("body-parser");

const auth = require("../middleware/auth");

cart_route.post('/add-to-cart', auth, add_to_cart);
cart_route.get('/getCart', auth, getCart);
cart_route.post('/removeItem', auth, removeItem);


module.exports = {
  routes: cart_route,
};
