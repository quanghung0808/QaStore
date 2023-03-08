import { notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import AuthModal from "../components/auth/AuthModal";
import NavbarMenu from "../components/layout/NavbarMenu";
import UserNavbar from "../components/layout/UserNavbar";
import Player from "../components/player/Player";
import PlayerGuest from "../components/player/PlayerGuest";
import { AuthContext } from "../contexts/AuthContext";
import { PlayerContext } from "../contexts/PlayerContext";

const PlayerView = () => {
  const [modal, setModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PlayerContext);

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
        <PlayerGuest />
        <AuthModal modal={modal} setModal={setModal} />
      </>
    );
  else if (isAuthenticated)
    body = (
      <>
        <UserNavbar />
        <Player />
      </>
    );
  return (
    <>
      {contextHolder}
      {body}
    </>
  );
};

export default PlayerView;
