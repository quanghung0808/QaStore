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
import { Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const PlayerDetail = () => {
  const {
    nationState: { nations },
    getNations,
  } = useContext(NationContext);
  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const {
    playerState: { player },
    findPlayer,
  } = useContext(PlayerContext);
  const currentURL = window.location.pathname.slice(9); // returns the absolute URL of a page
  useEffect(() => {
    findPlayer(currentURL);
  }, []);
  // console.log(player.isCaptain === "true");

  return (
    <>
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
              {isAdmin && (
                <Link
                  style={{ textAlign: "-webkit-center" }}
                  to={`/players/update/${player._id}`}
                >
                  <button
                    style={{ display: "block" }}
                    id="form-submit"
                    class="main-button mt-4"
                  >
                    Update
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div class="create-nft">
          <div class="container">
            <div class="row">
              <div class="col-lg-8">
                <div class="section-heading">
                  <div class="line-dec"></div>
                  <h2>Create Phone & Put It On The All Phones View.</h2>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="main-button" style={{ marginTop: "10px" }}>
                  <Link to="/addPlayer">Create Phone Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerDetail;
