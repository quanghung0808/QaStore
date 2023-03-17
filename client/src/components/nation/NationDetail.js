import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NationContext } from "../../contexts/NationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const NationDetail = () => {
  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const {
    nationState: { nation },
    findNation,
  } = useContext(NationContext);
  const currentURL = window.location.pathname.slice(9); // returns the absolute URL of a page
  useEffect(() => {
    findNation(currentURL);
  }, []);
  console.log(nation);
  return (
    <>
      <div class="item-details-page">
        <div class="container">
          <div class="row mt-5">
            <Button style={{ width: "100px", marginBottom: "10px" }}>
              <Link to="/nations" style={{ marginBottom: "10px" }}>
                Back
                <FontAwesomeIcon icon={faArrowLeft} className="" />
              </Link>
            </Button>

            <div class="col-lg-12">
              <div class="section-heading">
                <div class="line-dec"></div>
                <h2>
                  View Details For<em> Brand</em> Here.
                </h2>
              </div>
            </div>
            <div class="col-lg-12 align-self-center">
              <h3
                style={{
                  marginBottom: "50px",
                  fontSize: "50px",
                }}
              >
                {nation.name}
              </h3>

              <h5
                style={{
                  marginBottom: "30px",
                  wordBreak: "break-word",
                  fontSize: "18px",
                }}
              >
                {nation.description}
              </h5>
              {/* <div class="row">
                <div class="col-12">
                  <span class="bid">
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                    >
                      Rank
                    </span>
                    <strong
                      style={{
                        marginLeft: "35px",
                        fontSize: "30px",
                      }}
                    >
                      {nation.rank}
                    </strong>
                    <br />
                  </span>
                </div>
              </div> */}
              {isAdmin && (
                <Link
                  to={`/nations/update/${nation._id}`}
                  style={{ textAlign: "-webkit-center" }}
                >
                  <button
                    id="form-submit"
                    class="main-button mt-4"
                    style={{ display: "block" }}
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
                  <h2>Create Category & Put It On The All Categories View.</h2>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="main-button" style={{ marginTop: "10px" }}>
                  <Link to="/addNation">Create Category Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NationDetail;
