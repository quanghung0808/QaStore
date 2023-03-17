const Cart = require("../models/Cart");

const add_to_cart = async (req, res) => {
  try {
    const existingCartItem = await Cart.findOne({
      product_id: req.body.product_id,
    });
    if (existingCartItem) {
      // If it exists, update the existing item by incrementing its amount by 1
      existingCartItem.amount += 1;
      const updatedCartItem = await existingCartItem.save();
      res.status(200).send({
        success: true,
        msg: "Cart Product detail updated",
        data: updatedCartItem,
      });
    } else {
      // If it does not exist, create a new cart item with the provided details
      const cart_obj = new Cart({
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        price: req.body.price,
        user_id: req.body.user_id,
        amount: 1,
      });

      const cartData = await cart_obj.save();

      res.status(200).send({
        success: true,
        msg: "Cart Product detail added",
        data: cartData,
      });
    }

    // res.status(200).send({ success:true, msg:"Cart Product detail",data: cartData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const cart = await Cart.find({ user_id }).exec();

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.json({
      success: true,
      message: "Cart retrieved successfully",
      CartDetail: cart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const product_id = req.query.product_id;
    const removeItem = await Cart.findOneAndDelete({ product_id }).exec();

    // User not authorised to delete the post
    if (!removeItem)
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    res.json({
      success: true,
      message: "Remove Successfully!",
      phone: removeItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  add_to_cart,
  getCart,
  removeItem,
};
