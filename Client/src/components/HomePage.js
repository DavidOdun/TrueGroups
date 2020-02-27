import React, { Component } from 'react';
import { Button} from 'reactstrap';

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
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="/">
                        <img src="/TrueGroupLogo.png" width="150" height="150" alt="True Group Company Logo">
                        </img>
                    </a>
                    <h1>Welcome to True Groups</h1>
                    <div>
                        <Button size="lg" color="primary"> Register</Button>{' '}
                        <Button size="lg" color="secondary"> Login </Button>
                    </div>
                </nav>
                <div className="row justify-content-center">
                    <div className="col">
                        One of two columns
                    </div>
                    <div className="col">
                        <img src="/StudentsWorking.jpg" className="img-fluid" alt="Student working around computer">
                        </img>                          
                    </div>
                </div>
            </div>
      );
    }
  }
  
  export default HomePage;
  