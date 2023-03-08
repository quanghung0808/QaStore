import React from "react";
import UserNavbar from "../components/layout/UserNavbar";
import ManageUser from "../components/user/ManageUser";

const ManageUserView = () => {
  return (
    <>
      <ManageUser />
      <UserNavbar />
    </>
  );
};

export default ManageUserView;
