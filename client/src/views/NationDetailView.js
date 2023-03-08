import React, { useContext, useState } from "react";
import AuthModal from "../components/auth/AuthModal";
import NavbarMenu from "../components/layout/NavbarMenu";
import UserNavbar from "../components/layout/UserNavbar";
import NationDetail from "../components/nation/NationDetail";
import NationDetailGuest from "../components/nation/NationDetailGuest";
import { AuthContext } from "../contexts/AuthContext";
const NationDetailView = () => {
  const [modal, setModal] = useState(false);

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (!isAuthenticated)
    body = (
      <>
        <NavbarMenu modal={modal} setModal={setModal} />
        <NationDetailGuest />
        <AuthModal modal={modal} setModal={setModal} />
      </>
    );
  else if (isAuthenticated)
    body = (
      <>
        <UserNavbar />
        <NationDetail />
      </>
    );
  return <>{body}</>;
};

export default NationDetailView;
