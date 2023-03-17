import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NationContext } from "../../contexts/NationContext";
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
  const {
    nationState: { nations },
    getNations,
  } = useContext(NationContext);
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
          <div class="row mt-3">
            <Button style={{ width: "100px", marginBottom: "10px" }}>
              <Link to="/players" style={{ marginBottom: "10px" }}>
                <FontAwesomeIcon icon={faArrowLeft} className="" />
                Back
              </Link>
            </Button>

            <div class="col-lg-12">
              <div class="section-heading">
                <div class="line-dec"></div>
                <h2>
                  View Details For<em> Phone</em> Here.
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
                    Brand
                    <br />
                    {nations
                    .filter((nation) => nation._id === player.category)
                    .map((index) => (
                      <strong> {index.name}</strong>
                    ))}
                    <br />
                  </span>
                </div>
                <div class="col-7">
                  <span class="owner">
                  Price
                    <br />
                    <strong>{player.price} VNĐ</strong>
                    <br />
                  </span>
                </div>
                <div class="col-5">
                  <span class="ends">
                  OS
                    <br />
                    <strong>{player.os}</strong>
                    <br />
                  </span>
                </div>
                <div class="col-7">
                  <span class="owner">
                  Screen Size
                    <br />
                    <strong>{player.size} inches</strong>
                    <br />
                  </span>
                </div>
                <div class="col-7">
                  <span class="owner">
                  Power
                    <br />
                    <strong>{player.pin}mAh</strong>
                    <br />
                  </span>
                </div>
                <div class="col-7">
                  <span class="ends">
                  Ram
                    <br />
                    <strong>{player.ram} GB</strong>
                    <br />
                  </span>
                </div>
                {/* <div class="col-7">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerDetailGuest;
