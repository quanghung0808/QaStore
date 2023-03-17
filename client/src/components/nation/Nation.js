import React, { useContext, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { NavLink, useLocation } from "react-router-dom";
import { NationContext } from "../../contexts/NationContext";
import { Empty } from "antd";
import SingleNation from "./SingleNation";
import { AuthContext } from "../../contexts/AuthContext";

const Nation = () => {
  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const { pathname } = useLocation();
  const {
    nationState: { nations },
    getNations,
  } = useContext(NationContext);
  // Start: Get All nationss
  useEffect(() => {
    getNations();
  }, []);
  let body;

  if (nations.length === 0) {
    body = <Empty />;
  } else {
    body = nations.map((nation) => <SingleNation nation={nation} />);
  }

  return (
    <div>
      <div class="discover-items">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="section-heading">
                <div class="line-dec"></div>
                {isAdmin ? (
                  <h2>
                    <em>Category</em> Management
                  </h2>
                ) : (
                  <h2>
                    The Category Best In 2022 <em>Categories</em>
                  </h2>
                )}
              </div>
            </div>
            <div class="col-lg-7">
              <div class="buttons" style={{ textAlign: "right" }}>
                <div class="main-button">
                  {isAdmin && (
                    <NavLink
                      to="/addNation"
                      class="explore"
                      isActive={() => ["/nations"].includes(pathname)}
                      style={{ marginTop: "15px" }}
                    >
                      Create New Category
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nation;
