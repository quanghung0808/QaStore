import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import "./player.css";

const SinglePlayerGuest = ({ player }) => {
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
      <div style={{ marginLeft: "15px" }}>
        <div class="wrapperPlayer">
          <div class="cardPlayer">
            <div
              class="front"
              style={{ backgroundImage: `url("${player.image}")` }}
            >
              <h2>{player.name}</h2>
              <p>{player.nation}</p>
              <p class="price">{matches[1]}</p>
            </div>
            <div class="right">
              <h2>{player.name}</h2>

              <ul>
                <li>Nation: {player.nation}</li>
                <li>Position: {player.position}</li>
                <li>Total Goals: {player.goals}</li>
                <li>
                  Is captain:{" "}
                  {player.isCaptain === "true" ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{
                        color: "#a0ffa0",
                        fontSize: "22px",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{
                        color: "red",
                        fontSize: "22px",
                        verticalAlign: "bottom",
                      }}
                    />
                  )}
                </li>
              </ul>

              <button className="viewDetailUserRole" onClick={handleClick}>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerGuest;
