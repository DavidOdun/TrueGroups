import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignInPage extends Component {
    state = {
      signInPageData: null
    }
  
    componentDidMount(){
       /* Make Axios Call to Express BackEnd 
      axios.get('/hello')
        .then(res => this.setState({hello: res.data}))
        .catch(err => console.log(err))
        */
    }
    /* 
        ToDo:
        1. Save the user input as a part of this components state
        2. Display User Entry on Button Press
        3. On Button Click: Verify correctness of login information
            a. Redirect to new page on button pressed
            b. Notify and redirect to current page on failed login
    */
    render() {
      return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="/">
                        <img src="/TrueGroupLogo.png" width="150" height="150" alt="True Group Company Logo">
                        </img>
                    </a>
                    <h1>True Groups</h1>
                    <div></div>
                </nav>
                <div className="container">
                    <Form>
                        <FormGroup>
                            <Label for="exampleUsername">Username</Label>
                            <Input type="username" name="usernmae" id="exampleUsername" placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="strong password" />
                        </FormGroup>
                        <Button color="primary" size="lg" block>Login</Button>
                    </Form>
                </div>
            </div>
      );
    }
  }
  
  export default SignInPage;
  