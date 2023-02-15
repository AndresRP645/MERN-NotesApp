import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.css";

const users_url = "http://localhost:4000/api/users/";
const cookies = new Cookies();

export default class Login extends Component {
  state = {
    form: {
      userName: "",
      password: "",
    },
  };

  componentDidMount = () => {
    if (cookies.get("id")) {
      window.location.href = "./notes";
    }
  };

  handleChange = async (e) => {
    console.log([e.target.id]+": "+ e.target.value)
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value,
      },
    });
  };

  logIn = async () => {
    if (this.state.form.userName === "" && this.state.form.password === "") {
      alert("Ingresa un Usuario y Contraseña");
    } else {
      const data = (
        await axios.get(users_url + this.state.form.userName)
      ).data;
      if (data === null) {
        alert("El usuario no existe");
      } else {
        if (data.password === md5(this.state.form.password)) {
            console.log(data);
            cookies.set("id", data._id, { path: "/" });
          cookies.set("lastName", data.l_name, { path: "/" });
          cookies.set("secondLastName", data.sl_name, { path: "/" });
          cookies.set("name", data.name, { path: "/" });
          cookies.set("userName", data.username, { path: "/" });
          //alert(`Bienvenido ${data.name} ${data.l_name}`);
                    window.location.href = "./notes";
        } else {
          alert("La contraseña es incorrecta");
        }
      }
    }
  };

  render() {
    return (
      <div className="app-container">
        <div className="container">
          <div className="form-group">
            <form onSubmit={this.logIn}>
            <label className="form-label" >
              username
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              onChange={this.handleChange}
              placeholder="user"
            />

            <br />

            <label className="form-label" >
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.handleChange}
              placeholder="password"
            />

            <br />

            <button
              className="btn btn-outline-success"
              id="send"
            >
              Login
            </button>
            </form>
            <br />
            <Link className="text-danger" to="/register" id="register">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
