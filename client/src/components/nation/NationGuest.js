import React, { useContext, useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useLocation } from "react-router-dom";
import { NationContext } from "../../contexts/NationContext";
import { Carousel, Empty, notification } from "antd";
import SingleNationGuest from "./SingleNationGuest";
import TopNation from "./TopNation";
import { AuthContext } from "../../contexts/AuthContext";

const NationGuest = () => {
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
  const { pathname } = useLocation();
  const {
    nationState: { nations, nationsLoading },
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
    body = nations.map((nation) => <SingleNationGuest nation={nation} />);
  }

  return (
    <div>
      {contextHolder}
      <div class="page-heading">
        <div class="featured-explore">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                {/* <h2 className="mb-5">Top 5 Brand in 2022</h2>
                <Carousel autoplay autoplaySpeed={3000}>
                  {nations.length !== 0 ? (
                    nations
                      .sort((a, b) => a.rank - b.rank)
                      .reverse()
                      .slice(0, 5)
                      .map((nation) => <TopNation nation={nation} />)
                  ) : (
                    <Empty />
                  )}
                </Carousel> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="discover-items">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="section-heading">
                <div class="line-dec"></div>

                <h2>
                  The popular brand 2022 <em>Best Of Brand</em>
                </h2>
              </div>
            </div>
            <div class="col-lg-7"></div>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationGuest;
