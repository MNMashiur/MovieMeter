import { Link } from "react-router-dom";

import "../CSS/Navbar.css";

import {useMovieContext} from "../Context/MovieContext";

function NavBar() {

  const {
    refreshUser
  } = useMovieContext();

  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");

  let user = null;

  try {

    user =

      userData &&

      userData !== "undefined"

        ? JSON.parse(userData)

        : null;

  } catch {

    user = null;
  }

  return (

    <nav className="navbar">

      <div className="navbar-brand">

        <Link to="/">

          MovieMeter

        </Link>

      </div>

      <div className="navbar-links">

        <Link
          to="/"
          className="nav-link"
        >

          Home

        </Link>

        <Link
          to="/favorites"
          className="nav-link"
        >

          Favorites

        </Link>

        {

          token && user?._id ? (

            <Link

              to="/profile"

              className="profile-avatar"
            >

              <div className="profile-circle">

                {

                  user?.firstName
                    ?.charAt(0)
                    ?.toUpperCase()

                }

              </div>

            </Link>

          ) : (

            <Link

              to="/login"

              className="nav-link login-btn"
            >

              Login

            </Link>

          )
        }

      </div>

    </nav>
  );
}

export default NavBar;