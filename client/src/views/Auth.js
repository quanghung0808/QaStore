import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import HomeGuest from "../components/auth/HomeGuest";
import NavbarMenu from "../components/layout/NavbarMenu";
import AuthModal from "../components/auth/AuthModal";
import { notification } from "antd";
import Footer from "../components/layout/Footer";

const Auth = () => {
  const [api, contextHolder] = notification.useNotification();
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(AuthContext);

  useEffect(() => {
    if (show) {
      api[type]({
        message: message,
        placement: "bottomRight",
      });
      setShowToast({ show: false, message: "", type: null });
    }
  }, [show]);

  const [modal, setModal] = useState(false);
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = (
      <div id="js-preloader" class="js-preloader">
        <div class="preloader-inner">
          <span class="dot"></span>
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  } else if (isAuthenticated && !user.isAdmin) return <Navigate to="/home" />;
  else if (isAuthenticated && user.isAdmin) return <Navigate to="/users" />;
  else
    body = (
      <>
        <NavbarMenu modal={modal} setModal={setModal} />
        <HomeGuest />
        <Footer />
      </>
    );

  return (
    <div>
      {contextHolder}
      {body}
      <AuthModal modal={modal} setModal={setModal} />
    </div>
  );
};

export default Auth;
