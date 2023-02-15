import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

let count = 0;

export default class NotesList extends Component {
  state = {
    notes: [],
  };

  componentDidMount = async () => {
    if (!cookies.get("id")) {
      window.location.href = "./";
    }
    this.getNotes();
  };

  OnClick = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("lastNameame", { path: "/" });
    cookies.remove("secondLastName", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("userName", { path: "/" });
    window.location.href = "./";
  };

  getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes");
    this.setState({ notes: res.data });
  };

  deleteNote = async (id) => {
    console.log(id);
    await axios.delete("http://localhost:4000/api/notes/" + id);
    this.getNotes();
  };

  editNote = async (id) => {
    console.log(id);
    await axios.get("http://localhost:4000/api/notes/" + id);
    this.getNotes();
  };

  render() {
    return (
      <div className="row">
        {" "}
        {this.state.notes.map((note) => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.title}</h5>
                <Link className={"btn btn-secondary note-edit " + "note-edit-" + count} to={"/edit_note/" + note._id}
                name = {"note-edit-" + count}>
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p className="text-primary">{note.content}</p>
                <br />
                <br />
                <p className="text-success">Autor: {note.author}</p>
                <p className="text-warning">Fecha: {format(note.date)}</p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => this.deleteNote(note._id)}
                  name = {"note-delete-" + count}
                  className={"btn btn-danger note-delete " + "note-delete-" + count++}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
