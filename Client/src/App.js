import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import EditPage from './components/EditPage';
import StudentPage from './components/StudentPage';
import ProfessorPage from './components/ProfessorPage';

/* Starting Home Page */
class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path ="/">
            <HomePage />
          </Route>
          <Route path ="/signin">
            <SignInPage />
          </Route>
          <Route path ="/signup">
            <SignUpPage />
          </Route>
          <Route path ="/editprofile">
            <EditPage />
          </Route>
          <Route path ="/studentpage">
            <StudentPage />
          </Route>
          <Route path ="/professorpage">
            <ProfessorPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
