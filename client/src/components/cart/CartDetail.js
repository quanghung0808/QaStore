import {
  Table,
  TableHeader,
  TableRow,
  TableData,
  Button,
} from "../cart/StyledComponents.js";
import { CartContext } from "../../contexts/CartContext";
import React, { useContext, useEffect, useState } from "react";

const CartDetail = () => {
  const { getCart, removeItem } = useContext(CartContext);
  const [listCart, setListCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCart();
      setListCart(result);
      setLoading(false);
    };
    fetchData();
  }, [getCart]);

  const handleRemoveItem = async (itemId) => {
    try {
      const success = await removeItem(itemId);
      setListCart((prevCart) =>
        prevCart.filter((item) => item.product_id !== itemId)
      ); // update state
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const totalPrice = listCart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.amount),
    0
  );

  return (
    <React.Fragment>
      {loading ? (
        <div>Loading cart...</div>
      ) : (
        <div className="item-details-page">
          <div className="container">
            <div className="col-lg-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h2>
                  View <em>Cart</em>
                </h2>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Product Name</TableHeader>
                      <TableHeader>Amount</TableHeader>
                      <TableHeader>Price</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {listCart.map((item) => (
                      <TableRow key={item._id}>
                        <TableData>{item.product_name}</TableData>
                        <TableData>{item.amount}</TableData>
                        <TableData>
                          {(
                            Number(item.price) * Number(item.amount)
                          ).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </TableData>
                        <Button
                          onClick={() => handleRemoveItem(item.product_id)}
                        >
                          Remove Item
                        </Button>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
                <div
                  style={{
                    color: "white",
                    marginTop: "15px",
                    marginBottom: "",
                  }}
                >
                  <strong>Total:</strong> {totalPrice.toLocaleString("vi-VN")}{" "}
                  VND
                </div>
                <Button>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CartDetail;
