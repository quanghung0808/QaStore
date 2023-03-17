import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { NationContext } from "../../contexts/NationContext";

import "./player.css";
import { Button } from "antd";

const SinglePlayerGuest = ({ player }) => {
  const {
    nationState: { nations },
    getNations,
  } = useContext(NationContext);
  const navigate = useNavigate();
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

            <Button
              className="mb-3 mt-3 btn btn-danger"
              style={{ marginLeft: "120px" }}
              onClick={handleClick}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerGuest;
