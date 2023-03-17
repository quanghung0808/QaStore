import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NationContext } from "../../contexts/NationContext";

const SinglePlayerGuest = ({ nation }) => {
  return (
    <div class="col-lg-3">
      <div class="item">
        <div className="row mb-3">
          <div class="col-2 ">
            <p>Brand</p>
          </div>
          <div class="col-8 ">
            <p
              className="text-end"
              style={{ fontFamily: "fantasy", fontSize: "22px" }}
            >
              {nation.name}
            </p>
          </div>
          <div class="col-2"></div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="main-button" style={{ marginTop: "15px" }}>
              <Link
                to={`/nations/${nation._id}`}
                style={{ fontSize: "12px", padding: "5px 15px" }}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerGuest;
