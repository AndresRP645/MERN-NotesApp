import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export default class CreateNote extends Component {

    state = {
        date: new Date(),
        title: '',
        content: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (!cookies.get('id')) {
            window.location.href = "./";
        }
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/'
                + this.props.match.params.id);
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date)
            });
        }

    }

    onSubmit = async e => {
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: cookies.get('userName'),
               
        }

        if (this.state.editing) {
            console.log(this.state.id);
            await axios.put('http://localhost:4000/api/notes/' + this.props.match.params.id, newNote);
        }
        else {

            await axios.post('http://localhost:4000/api/notes', newNote);
        }




        window.location.href = '/';
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeDate = date => {
        this.setState({ date });

    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>{this.props.match.params.id ? "Edit Note ": "Create Note"}</h4>
                    
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            id="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                            required />

                    </div>
                    <div className="form-group">
                        <textarea name="content"
                            className="form-control"
                            placeholder="Content"
                            id="content"
                            onChange={this.onInputChange}
                            value={this.state.content}
                            required>
                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker
                            className='form-control'
                            id="date"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        ></DatePicker>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button
                            type="submit"
                            id="button"
                            className="btn btn-primary">
                            Save Note
                        </button>
                    </form>
                </div>

            </div>
        )
    }
}