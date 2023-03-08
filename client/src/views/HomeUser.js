import React from "react";
import HomeGuest from "../components/auth/HomeGuest";
import UserNavbar from "../components/layout/UserNavbar";

const HomeUser = () => {
  return (
    <>
      <UserNavbar />
      <HomeGuest />
    </>
  );
};

export default HomeUser;
