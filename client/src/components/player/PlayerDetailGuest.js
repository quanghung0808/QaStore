import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faCircleCheck,
  faCircleXmark,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Button, notification } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const PlayerDetailGuest = () => {
  const [api, contextHolder] = notification.useNotification();
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(AuthContext);
  console.log(show, message, type);
  useEffect(() => {
    if (show) {
      api[type]({
        message: message,
        placement: "bottomRight",
      });
      setShowToast({ show: false, message: "", type: null });
    }
  }, [show]);
  const {
    playerState: { player },
    findPlayer,
  } = useContext(PlayerContext);
  const currentURL = window.location.pathname.slice(9); // returns the absolute URL of a page
  useEffect(() => {
    findPlayer(currentURL);
  }, []);
  console.log(player.isCaptain === "true");
  return (
    <>
      {contextHolder}
      <div class="item-details-page">
        <div class="container">
          <div class="row">
            <Button style={{ width: "100px", marginBottom: "10px" }}>
              <Link to="/players" style={{ marginBottom: "10px" }}>
                Back
                <FontAwesomeIcon icon={faArrowLeft} className="" />
              </Link>
            </Button>

            <div class="col-lg-12">
              <div class="section-heading">
                <div class="line-dec"></div>
                <h2>
                  View Details For<em> Player</em> Here.
                </h2>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="left-image">
                <img
                  src={player.image}
                  alt=""
                  style={{
                    borderRadius: "20px%",
                  }}
                />
              </div>
            </div>
            <div class="col-lg-5 align-self-center">
              <h2 className="mb-3">{player.name}</h2>

              <p>{player.description}</p>
              <div class="row">
                <div class="col-5">
                  <span class="bid">
                    Nation
                    <br />
                    <strong>{player.nation}</strong>
                    <br />
                  </span>
                </div>
                <div class="col-7">
                  <span class="owner">
                    Position
                    <br />
                    <strong>{player.position}</strong>
                    <br />
                  </span>
                </div>
                <div class="col-5">
                  <span class="ends">
                    Goal
                    <br />
                    <strong>{player.goals}</strong>
                    <br />
                  </span>
                </div>
                <div class="col-7">
                  <span class="ends">
                    Is captain?
                    <br />
                    {player.isCaptain === "true" ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{
                          color: "green",
                          fontSize: "22px",
                          marginTop: "8px",
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{
                          color: "red",
                          fontSize: "22px",
                          marginTop: "8px",
                        }}
                      />
                    )}
                    <br />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerDetailGuest;
