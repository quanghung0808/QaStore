import React, { useContext, useEffect, useRef, useState } from "react";
import { Carousel, notification } from "antd";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import VisibilitySensor from "react-visibility-sensor";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const HomeGuest = () => {
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
  const [nations, setNation] = useState(
    JSON.parse(localStorage.getItem("Nations"))
  );

  const [players, setPlayer] = useState(
    JSON.parse(localStorage.getItem("Players"))
  );

  const myRef = useRef(null);

  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      {contextHolder}
      <div class="main-banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 ">
              <Carousel autoplay>
                <div class="item">
                  <img
                    src="assets/images/img4.jpg"
                    width="200px"
                    height="442px"
                  />
                </div>
                <div class="item">
                  <img
                    src="assets/images/img1.jpg"
                    width="200px"
                    height="442px"
                  />
                </div>
                <div class="item">
                  <img
                    src="assets/images/img2.jpg"
                    width="200px"
                    height="442px"
                  />
                </div>
                <div class="item">
                  <img
                    src="assets/images/img3.jpg"
                    width="200px"
                    height="442px"
                  />
                </div>
              </Carousel>
            </div>
            <div class="col-lg-6 align-self-center">
              <div class="header-text">
                <div class="buttons">
                  <div class="main-button">
                    <a
                      onClick={() => myRef.current.scrollIntoView()}
                      target="_blank"
                      class="explore"
                    >
                      Explore
                    </a>
                  </div>
                </div>
                <p>'</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="categories-collections" ref={myRef}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="collections">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="section-heading">
                      <div class="line-dec"></div>
                      <h2>
                        Explore Some Hot <em>Nations</em> In World Cup 2022.
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-12 ">
                    <OwlCarousel
                      items={3}
                      className="owl-theme"
                      loop
                      nav
                      autoplay={true}
                      autoplaySpeed={2000}
                      autoplayTimeout={3000}
                      margin={20}
                    >
                      {nations.map((item) => (
                        <div class="item">
                          <img
                            src={`${item.image}`}
                            alt=""
                            width="292px"
                            height="233px"
                          />
                          <div class="down-content">
                            <h4>{item.name}</h4>
                            <span class="collection">Fifa world ranking</span>
                            <span class="category">{item.rank}</span>
                          </div>
                          <div class="buttons">
                            <div className="main-button">
                              <Link
                                to={`/nations/${item._id}`}
                                style={{
                                  fontSize: "20px",
                                  padding: "0px 5px",
                                }}
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="collections">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="section-heading">
                        <div class="line-dec"></div>
                        <h2>
                          Explore Some Hot <em>Players</em> In World Cup 2022.
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-12 ">
                      <OwlCarousel
                        items={3}
                        className="owl-theme"
                        loop
                        nav
                        autoplay={true}
                        autoplaySpeed={2000}
                        autoplayTimeout={3000}
                        margin={20}
                      >
                        {players.map((item) => (
                          <div class="item">
                            <img
                              src={`${item.image}`}
                              alt=""
                              width="292px"
                              height="233px"
                            />
                            <div class="down-content">
                              <h4>{item.name}</h4>
                              <span class="collection">Total Goals</span>
                              <span class="category">{item.goals}</span>
                            </div>
                            <div class="buttons">
                              <div className="main-button">
                                <Link
                                  to={`/players/${item._id}`}
                                  style={{
                                    fontSize: "20px",
                                    padding: "0px 5px",
                                  }}
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </OwlCarousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="create-nft">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="video-wrap">
                <VisibilitySensor
                  onChange={(isVisible) => setIsVisible(isVisible)}
                >
                  <video loop muted ref={videoRef}>
                    <source src="assets/images/video.mp4" type="video/mp4" />
                  </video>
                </VisibilitySensor>
                {/* <video autoplay playsinline loop muted>
                  <source src="assets/images/video.mp4" type="video/mp4" />
                  <source src="assets/images/video.mp4" type="video/ogg" />
                  Your browser does not support HTML5 video.
                </video> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGuest;
