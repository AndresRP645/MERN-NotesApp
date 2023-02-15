import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import Login from './components/Login';

import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      
      <Navigation/>
      <div className="container p-4">
      <Route path='/' exact component={Login}/>  
      <Route path='/notes' exact component={NotesList}/>
      <Route path='/edit_note/:id' exact component={CreateNote}/>
      <Route path='/create_note' exact component={CreateNote}/>
      <Route path='/register' exact component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
