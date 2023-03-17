import { Button, Popconfirm } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NationContext } from "../../contexts/NationContext";
import { PlayerContext } from "../../contexts/PlayerContext";
import { CartContext } from "../../contexts/CartContext";
import "./player.css";

const SinglePlayer = ({ player }) => {
  const {
    nationState: { nations },
    getNations,
  } = useContext(NationContext);
  // Start: Get All nationss
  useEffect(() => {
    getNations();
  }, []);
  const navigate = useNavigate();
  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const { deletePlayer, setShowToast } = useContext(PlayerContext);
  const position = player.position + "";
  const regExp = /\(([^)]+)\)/g;
  const matches = [...position.matchAll(regExp)].flat();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = () => {
    deletePlayer(player._id);
    setShowToast({
      show: true,
      message: "Delete Successsfully",
      type: "success",
    });
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleClick = () => {
    navigate(`/players/${player._id}`);
  };

  return (
    <div class="col-lg-4">
      <div>
        <div class="cardPlayer">
          <div class="single-item">
            <img src={player.image} width="350px" height="300px" alt="" />
            <div class="name">{player.name}</div>
            <div class="price">{player.price.toLocaleString("vi-VN")}VNĐ</div>
            <div class="">Screen Size: {player.size} inch</div>
            <div class="">Operating System: {player.os}</div>
            {nations
              .filter((nation) => nation._id === player.category)
              .map((index) => (
                <div class="">Brand: {index.name}</div>
              ))}
            <div class=" mb-5">RAM: {player.ram} GB</div>

            {!isAdmin && (
              <CartContext.Consumer>
                {({ addToCart }) => (
                  <Button
                    style={{ marginLeft: "58px" }}
                    onClick={async () => await addToCart(player)}
                    className="btn btn-primary"
                  >
                    ADD TO CART
                  </Button>
                )}
              </CartContext.Consumer>
            )}

            {isAdmin ? (
              <Button
                style={{ marginLeft: "80px" }}
                className="mb-3 mt-3 btn btn-danger"
                onClick={handleClick}
              >
                Details
              </Button>
            ) : (
              <Button
                className="mb-3 mt-3 btn btn-danger"
                onClick={handleClick}
              >
                Details
              </Button>
            )}
            {isAdmin && (
              <Popconfirm
                title="Warning"
                description="Are you sure to delete this phone?"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{
                  loading: confirmLoading,
                }}
                onCancel={handleCancel}
              >
                <Button className="mb-3" onClick={showPopconfirm}>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;
