import { notification } from "antd";
import React, { useContext, useEffect } from "react";
import Profile from "../components/auth/Profile";
import UserNavbar from "../components/layout/UserNavbar";
import { AuthContext } from "../contexts/AuthContext";

const ProfileView = () => {
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

  return (
    <>
      {contextHolder}
      <UserNavbar />
      <Profile />
    </>
  );
};

export default ProfileView;
