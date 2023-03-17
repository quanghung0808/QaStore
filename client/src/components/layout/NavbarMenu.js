import { Link, NavLink, useLocation } from "react-router-dom";

const NavbarMenu = ({ modal, setModal }) => {
  const location = useLocation();

  return (
    <header class="header-area header-sticky">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="main-nav">
              <Link to="/" class="logo">
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

              <ul class="nav">
                <li>
                  <NavLink to="/" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/players"
                    activeClassName="active"
                    className={location.pathname === "/:_id" ? "active" : ""}
                  >
                    Phone
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/nations"
                    activeClassName="active"
                    className={location.pathname === "/:_id" ? "active" : ""}
                  >
                    Categories
                  </NavLink>
                </li>

                <li class="section-btn">
                  <a onClick={() => setModal(!modal)}>Sign in/Join</a>
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

export default NavbarMenu;
