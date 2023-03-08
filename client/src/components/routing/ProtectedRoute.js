import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Footer from "../layout/Footer";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading)
    return (
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
  return isAuthenticated ? (
    <>
      <Component {...rest} />
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
