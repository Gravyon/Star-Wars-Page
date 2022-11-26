import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const redirect = useNavigate();
  const handleLogout = () => {
    let loggedIn = actions.logout();

    !loggedIn ? redirect.push("/") : null;
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom border-dark">
      <div className="container-fluid ">
        <Link className="navbar-brand " to="/">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/11/Star-Wars-Logo.png"
            className="logo"
            width={"55px"}
            height={"40px"}
            alt="..."
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="dropdown">
          {store.auth ? (
            <button
              className="btn btn-outline-primary  mx-3"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
          <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Your items:{" "}
            <span className="badge bg-danger rounded-circle">
              {store.favorites.length}
            </span>
          </button>
          <ul className="dropdown-menu">
            {store.favorites.map((item, id) => (
              <li className="p-2" key={id}>
                {item}
                <button
                  type="button"
                  onClick={() => actions.removeFavorite(item)}
                  className="btn "
                  style={{ float: "right" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
