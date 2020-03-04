import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';

class SignInPage extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            username: " ",
            password: " "
        }
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
        1. Save the user input as a part of this components state: Done
        2. Display User Entry on Button Press (For Testing): Done
        3. On Button Click: Verify correctness of login information
            - Important Bug: Do not display the user name and password on submit
            a. Redirect to new page (Class Info) on button pressed
            b. Notify and redirect to current page on failed login
    */
    render() {
        console.log("Showing State for the user")
        console.log(this.state)
      return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="/" id="UncontrolledTooltipExample">
                        <img src="/TrueGroupLogo.png" width="150" height="150" alt="True Group Company Logo">
                        </img>
                        <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                            Click to return Home
                        </UncontrolledTooltip>
                    </a>
                    <h1>True Groups</h1>
                    <div></div>
                </nav>
                <div className="container">
                    <Form>
                        <FormGroup>
                            <Label for="exampleUsername">Username</Label>
                            <Input type="username" name="usernmae" id="exampleUsername" onChange={(e) => this.setState({username: e.target.value})} placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" onChange={(e) => this.setState({password: e.target.value})} placeholder="strong password" />
                        </FormGroup>
                        <Button color="primary" size="lg" block>Login</Button>
                    </Form>
                </div>
            </div>
      );
    }
  }
  
  export default SignInPage;
  