import React, { useState, useReducer, useEffect } from "react";
import { playerReducer } from "../reducers/playerReducer";
import axios from "axios";
import { apiUrl, ADD_CART, LOCAL_STORAGE_USER, CART_DETAIL } from "./constants";

export const CartContext = React.createContext();

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(playerReducer, {
    cart: 1,
    carts: [],
    playerLoading: true,
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  console.log("The Cart Item: " + cartItems);

  const addToCart = async (product) => {
    setCartItems([...cartItems, product]);
    console.log("Add to cart product: ", product);
    try {
      const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
      console.log("The user: " + user._id);
      const requestCart = {
        product_id: product._id,
        product_name: product.name,
        price: product.price,
        user_id: user._id,
      };
      const response = await axios.post(
        `${apiUrl}/cart/add-to-cart`,
        requestCart
      );
      if (response.data.success) {
        dispatch({
          type: ADD_CART,
          payload: response.data.carts,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const getCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
      const response = await axios.get(
        `${apiUrl}/cart/getCart?user_id=${user._id}`
      );
      console.log("The View Cart: " + JSON.stringify(response.data.CartDetail));
      if (response.data.success) {
        dispatch({
          type: CART_DETAIL,
          payload: response.data.CartDetail,
        });
        return response.data.CartDetail;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const removeItem = async (product_id) => {
    try {
      const response = await axios.post(
        `${apiUrl}/cart/removeItem?product_id=${product_id}`
      );
      if (response.data.success) {
        console.log(
          "The item deleted: " + JSON.stringify(response.data.phone.product_id)
        );
        dispatch({
          type: CART_DETAIL,
          payload: response.data.phone,
        });
        setCartItems(
          cartItems.filter(
            (item) => item._id !== response.data.phone.product_id
          )
        );
        return response.data.CartDetail;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
        getCart: getCart,
        removeItem: removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
