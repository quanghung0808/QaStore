import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";

const UserNavbar = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const {
    authState: {
      user: { fullname, isAdmin },
      isAuthenticated,
    },
    logoutUser,
  } = useContext(AuthContext);
  const logout = () => logoutUser();
  const widgetMenu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
          {fullname}
        </NavLink>
      </Menu.Item>

      <Menu.Item onClick={logout}>
        <FontAwesomeIcon icon={faSignOut} className="icon" />
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <header class="header-area header-sticky">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="main-nav">
              {isAuthenticated ? (
                isAdmin ? (
                  <Link to="/#" class="logo">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/assignment-3-9e1d7.appspot.com/o/fifa_logo.svg?alt=media&token=a7006217-2443-4567-a7dd-2a32bb186e28"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/home" class="logo">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/assignment-3-9e1d7.appspot.com/o/fifa_logo.svg?alt=media&token=a7006217-2443-4567-a7dd-2a32bb186e28"
                      alt=""
                    />
                  </Link>
                )
              ) : (
                <Link to="/" class="logo">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/assignment-3-9e1d7.appspot.com/o/fifa_logo.svg?alt=media&token=a7006217-2443-4567-a7dd-2a32bb186e28"
                    alt=""
                  />
                </Link>
              )}

              <ul class="nav">
                {isAdmin ? (
                  <></>
                ) : (
                  <li>
                    <NavLink to="/home" activeClassName="active">
                      Home
                    </NavLink>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <NavLink to="/users" activeClassName="active">
                      Manage Users
                    </NavLink>
                  </li>
                )}
                {isAdmin ? (
                  <li>
                    <NavLink
                      to="/players"
                      activeClassName="active"
                      className={
                        location.pathname === "/addPlayer" ||
                        location.pathname === "/players/:_id"
                          ? "active"
                          : ""
                      }
                    >
                      Manage Players
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/players"
                      activeClassName="active"
                      className={
                        location.pathname === "/addPlayer" ||
                        location.pathname === "/players/:_id"
                          ? "active"
                          : ""
                      }
                    >
                      Players
                    </NavLink>
                  </li>
                )}

                {isAdmin ? (
                  <li>
                    <NavLink
                      to="/nations"
                      activeClassName="active"
                      className={
                        location.pathname === "/addNation" ||
                        location.pathname === "/nations/:_id"
                          ? "active"
                          : ""
                      }
                    >
                      Manage Nations
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/nations"
                      activeClassName="active"
                      className={
                        location.pathname === "/addNation" ||
                        location.pathname === "/nations/:_id"
                          ? "active"
                          : ""
                      }
                    >
                      Nations
                    </NavLink>
                  </li>
                )}

                <li>
                  <Dropdown overlay={widgetMenu} placement="bottomRight" arrow>
                    <Avatar
                      size="large"
                      icon={<FontAwesomeIcon icon={faUser} />}
                    />
                  </Dropdown>
                </li>
              </ul>
              <a class="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
