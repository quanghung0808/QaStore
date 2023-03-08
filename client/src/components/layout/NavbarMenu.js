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
                <img src="assets/images/fifa_logo.svg" alt="" />
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
                    Players
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/nations"
                    activeClassName="active"
                    className={location.pathname === "/:_id" ? "active" : ""}
                  >
                    Nations
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
