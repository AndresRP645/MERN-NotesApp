import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import md5 from "md5";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class CreateUser extends Component {
  state = {
    users: [],
    lastName: "",
    secondLastName: "",
    name: "",
    userName: "",
    password: "",
    passwordConfirmation: "",
  };

  componentDidMount = async () => {
    this.getUsers();
    console.log(this.state.users);
  };

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data });
  };

  deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
  };

  handleChange = async (e) => {
    console.log(e.target.id + ": "+e.target.value);
    await this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitUser = async () => {
    if (this.state.password === this.state.passwordConfirmation) {
      const uname = await axios.get(
        "http://localhost:4000/api/users/" + this.state.userName
      );
      console.log(this.state.userName);
      console.log(uname);
      if (uname.data != null) {
        alert("Ya existe un usuario con ese username");
        this.setState({ userName: "" });
      } else {
        const newUser = {
          l_name: this.state.lastName,
          sl_name: this.state.secondLastName,
          name: this.state.name,
          username: this.state.userName,
          password: md5(this.state.password),
        };
        console.log(newUser);
        await axios.post("http://localhost:4000/api/users", newUser);
        window.location.href = "./";
      }
    } else {
      alert("La contraseña no coincide");
      this.setState({ password: "", passwordConfirmation: "" });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Registrar nuevo usuario</h3>

            <form onSubmit={this.submitUser}>
              <div className="form-group">
                <label className="form-label">Apellido Paterno</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  onChange={this.handleChange}
                  placeholder="Apellido Paterno"
                />
                <br />
                <label className="form-label">Apellido Materno</label>
                <input
                  type="text"
                  className="form-control"
                  id="secondLastName"
                  onChange={this.handleChange}
                  placeholder="Apellido Materno"
                />
                <br />
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={this.handleChange}
                  placeholder="Nombre"
                />
                <br />
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  onChange={this.handleChange}
                  placeholder="Usuario"
                />
                <br />
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Contraseña"
                />
                <br />
                <label className="form-label">Confirma Contraseña</label>

                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirmation"
                  onChange={this.handleChange}
                  placeholder="Confima Contraseña"
                />
              </div>
              <br />
              <button type="submit" className="btn btn-success" id="send">
                Registrarse
              </button>
              <br />
              <Link className="text-warning" to="/">
                Iniciar Sesión
              </Link>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              Usuarios registrados
            </li>
            {this.state.users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => {
                  if (cookies.get("id") !== user._id) this.deleteUser(user._id);
                }}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
