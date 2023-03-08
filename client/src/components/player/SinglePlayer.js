import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NationContext } from "../../contexts/NationContext";
import { PlayerContext } from "../../contexts/PlayerContext";
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
      <div style={{ marginLeft: "15px" }}>
        <div class="wrapperPlayer">
          <div class="cardPlayer">
            <div
              class="front"
              style={{ backgroundImage: `url("${player.image}")` }}
            >
              <h2>{player.name}</h2>
              <p>
                {nations
                  .filter((nation) => nation._id === player.nation)
                  .map((index) => (
                    <>{index.name}</>
                  ))}
              </p>
              <p class="price">{matches[1]}</p>
            </div>
            <div class="right">
              <h2>{player.name}</h2>

              <ul>
                <li>
                  Nation:
                  {nations
                    .filter((nation) => nation._id === player.nation)
                    .map((index) => (
                      <>{index.name}</>
                    ))}
                </li>
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
              {isAdmin && (
                <Popconfirm
                  title="Warning"
                  description="Are you sure to delete this player?"
                  open={open}
                  onConfirm={handleOk}
                  okButtonProps={{
                    loading: confirmLoading,
                  }}
                  onCancel={handleCancel}
                >
                  <button onClick={showPopconfirm} className="delete">
                    Delete
                  </button>
                </Popconfirm>
              )}
              {isAdmin ? (
                <button className="viewDetail" onClick={handleClick}>
                  Details
                </button>
              ) : (
                <button className="viewDetailUserRole" onClick={handleClick}>
                  Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;
