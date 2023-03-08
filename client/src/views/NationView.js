import { notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import AuthModal from "../components/auth/AuthModal";
import NavbarMenu from "../components/layout/NavbarMenu";
import UserNavbar from "../components/layout/UserNavbar";
import Nation from "../components/nation/Nation";
import NationGuest from "../components/nation/NationGuest";
import { AuthContext } from "../contexts/AuthContext";
import { NationContext } from "../contexts/NationContext";

const NationView = () => {
  const [modal, setModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(NationContext);

  useEffect(() => {
    if (show) {
      api[type]({
        message: message,
        placement: "bottomRight",
      });
      setShowToast({ show: false, message: "", type: null });
    }
  }, [show]);
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (!isAuthenticated)
    body = (
      <>
        <NavbarMenu modal={modal} setModal={setModal} />
        <NationGuest />
        <AuthModal modal={modal} setModal={setModal} />
      </>
    );
  else if (isAuthenticated)
    body = (
      <>
        <UserNavbar />
        <Nation />
      </>
    );
  return (
    <>
      {contextHolder}
      {body}
    </>
  );
};

export default NationView;
