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
import { Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const PlayerDetail = () => {
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
  console.log(player.isCaptain === "true");
  return (
    <>
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
                  <h2>Create Player & Put It On The All Players View.</h2>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="main-button" style={{ marginTop: "10px" }}>
                  <Link to="/addPlayer">Create Player Now</Link>
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
