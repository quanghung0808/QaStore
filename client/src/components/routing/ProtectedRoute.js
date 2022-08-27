import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Navigate, Route } from "react-router-dom";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Component {...rest} />{" "}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
