import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import axios from 'axios';
import './App.css';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import EditPage from './components/EditPage';

/* Starting Home Page */
class App extends Component {
  state = {
    hello: null
  }

  componentDidMount(){
    axios.get('/api/hello')
      .then(res => this.setState({hello: res.data}))
      .catch(err => console.log(err))
      console.log("We got the state")
      console.log(this.state)
  }

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
        </Switch>
      </Router>
    );
  }
}

export default App;
