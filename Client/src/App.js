import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

/* Starting Home Page */
class App extends Component {
  state = {
    hello: null
  }

  componentDidMount(){
    axios.get('/hello')
      .then(res => this.setState({hello: res.data}))
      .catch(err => console.log(err))
      console.log("We got the state")
      console.log(this.state)
  }

  render() {
    return (
      <div>
      {
        this.state.hello
          ? <div> {this.state.hello} </div>
          : null }
      </div>

    );
  }
}

export default App;
