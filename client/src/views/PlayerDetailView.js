import React, { useContext, useState } from "react";
import AuthModal from "../components/auth/AuthModal";
import NavbarMenu from "../components/layout/NavbarMenu";
import UserNavbar from "../components/layout/UserNavbar";
import PlayerDetail from "../components/player/PlayerDetail";
import PlayerDetailGuest from "../components/player/PlayerDetailGuest";
import { AuthContext } from "../contexts/AuthContext";
const PlayerDetailView = () => {
  const [modal, setModal] = useState(false);

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (!isAuthenticated)
    body = (
      <>
        <NavbarMenu modal={modal} setModal={setModal} />
        <PlayerDetailGuest />
        <AuthModal modal={modal} setModal={setModal} />
      </>
    );
  else if (isAuthenticated)
    body = (
      <>
        <UserNavbar />
        <PlayerDetail />
      </>
    );
  return <>{body}</>;
};

export default PlayerDetailView;
