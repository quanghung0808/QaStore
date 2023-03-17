import React, { useContext, useEffect, useRef, useState } from "react";
import { Carousel, notification } from "antd";
import VisibilitySensor from "react-visibility-sensor";
import { AuthContext } from "../../contexts/AuthContext";

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
                    src="assets/images/iphone12promax.png"
                    width="200px"
                    height="442px"
                  />
                </div>
                <div class="item">
                  <img
                    src="assets/images/samsung.png"
                    width="200px"
                    height="442px"
                  />
                </div>
                <div class="item">
                  <img
                    src="assets/images/xiaomi.png"
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

      <div class="create-nft">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="video-wrap">
                <VisibilitySensor
                  onChange={(isVisible) => setIsVisible(isVisible)}
                >
                  <video loop muted ref={videoRef}>
                    <source
                      src="assets/images/iPhone 12 Pro Ad.mp4"
                      type="video/mp4"
                    />
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
