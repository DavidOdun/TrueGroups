import React, { Component } from 'react';

class HomePage extends Component {
    state = {
      homePageData: null
    }
  
    componentDidMount(){
       /* Make Axios Call to Express BackEnd 
      axios.get('/hello')
        .then(res => this.setState({hello: res.data}))
        .catch(err => console.log(err))
        */
    }
  
    render() {
      return (
        <div>
        </div>
      );
    }
  }
  
  export default HomePage;
  