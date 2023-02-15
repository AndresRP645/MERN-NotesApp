import React, { Component } from "react";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Navigation extends Component {
  state = {
    user: "registrarse",
  };

  componentDidMount = () => {
    if (cookies.get("id")) {
      this.setState({ user: "logout" });
    } else {
      this.setState({ user: "registrarse" });
    }
  };

  user_sesion = () => {
    if (cookies.get("id")) {
      cookies.remove("id", { path: "/" });
      cookies.remove("lastName", { path: "/" });
      cookies.remove("secondLastName", { path: "/" });
      cookies.remove("name", { path: "/" });
      cookies.remove("userName", { path: "/" });
      window.location.href = "./";
    } else {
      window.location.href = "./register";
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/notes">
            Notes
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
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create_note">
                  Create Note
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  id="user-sesion"
                  onClick={() => this.user_sesion()}
                >
                  {this.state.user}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
