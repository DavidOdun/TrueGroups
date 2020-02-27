import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';

class SignUpPage extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            email: " ",
            username: " ",
            password: " ",
            firstname: " ",
            lastname: " ",
            prefferedname: " ",
            institution: " "
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
        1. Save the user input as a part of this components state
        2. Display User Entry on Button Press
        3. Redirect to new page on button pressed
        4. Notification for Created Profile
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
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" onChange={(e) => this.setState({email: e.target.value})} placeholder="example@example.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input type="username" name="usernmae" id="exampleUsername" onChange={(e) => this.setState({username: e.target.value})} placeholder="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" onChange={(e) => this.setState({password: e.target.value})} placeholder="strong password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplFirstname">First Name</Label>
                        <Input type="firstname" name="firstname" id="exampleFirstname" onChange={(e) => this.setState({firstname: e.target.value})} placeholder="first name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleLastname">Last Name</Label>
                        <Input type="lastname" name="lastname" id="exampleLastname" onChange={(e) => this.setState({lastname: e.target.value})} placeholder="last name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePrefferedName">Preffered Name</Label>
                        <Input type="prefferedname" name="prefferedname" id="examplePrefferedname" onChange={(e) => this.setState({prefferedname: e.target.value})} placeholder="prefferred name" />
                    </FormGroup>       
                    <FormGroup>
                        <Label for="exampleSelect">Institution</Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.setState({institution: e.target.value})}>
                            <option>University of Notre Dame</option>
                            <option>Holy Cross College</option>
                            <option>Michigan State</option>
                            <option>Indiana University South Bend</option>
                            <option>Saint Mary's College</option>
                        </Input>
                    </FormGroup>
                    <Button color="primary" size="lg" block>Submit</Button>
                </Form>
                </div>
            </div>
      );
    }
  }
  
  export default SignUpPage;
  