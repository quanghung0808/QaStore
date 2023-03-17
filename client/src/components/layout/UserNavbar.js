import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

const UserNavbar = () => {
  const { cartItems } = useContext(CartContext);

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
                      style={{
                        width: "100%",
                        marginTop: "-140px",
                        marginLeft: "15px",
                      }}
                      src="https://firebasestorage.googleapis.com/v0/b/assignment-3-9e1d7.appspot.com/o/Quang_H%C3%B9ng__2_-removebg-preview.png?alt=media&token=cbf7f91b-fd12-4d4d-871d-f2ab2e389d96"
                      alt=""
                    />{" "}
                  </Link>
                ) : (
                  <Link to="/home" class="logo">
                    <img
                      style={{
                        width: "285px",
                        marginTop: "-115px",
                        marginLeft: "15px",
                        marginBottom: "2px",
                      }}
                      src="https://firebasestorage.googleapis.com/v0/b/assignment-3-9e1d7.appspot.com/o/Quang_H%C3%B9ng__2_-removebg-preview.png?alt=media&token=cbf7f91b-fd12-4d4d-871d-f2ab2e389d96"
                      alt=""
                    />
                  </Link>
                )
              ) : (
                <Link to="/" class="logo">
                  <img
                    style={{
                      width: "285px",
                      height: "94px",
                      marginTop: "-115px",
                      marginLeft: "15px",
                    }}
                    src="https://firebasestorage.googleapis.com/v0/b/assignment-3-9e1d7.appspot.com/o/Quang_H%C3%B9ng__2_-removebg-preview.png?alt=media&token=cbf7f91b-fd12-4d4d-871d-f2ab2e389d96"
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
                      Manage User
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
                      Manage Phone
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
                      Phone
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
                      Manage Category
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
                      Category
                    </NavLink>
                  </li>
                )}
                {isAdmin ? (
                  <></>
                ) : (
                  <li>
                    <NavLink to="/cart" activeClassName="active">
                      <CartContext.Consumer>
                        {({ getCart, cartItems }) => (
                          <div onClick={getCart}>
                            <div>Cart ({cartItems.length})</div>
                          </div>
                        )}
                      </CartContext.Consumer>
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
