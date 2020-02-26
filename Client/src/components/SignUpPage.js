import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUpPage extends Component {
    state = {
      signUpPageData: null
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
    */
    render() {
      return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="#">
                        <img src="/TrueGroupLogo.png" width="150" height="150" alt="True Group Company Logo">
                        </img>
                    </a>
                    <h1>True Groups</h1>
                    <div></div>
                </nav>
                <div class="container">
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="example@example.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input type="username" name="usernmae" id="exampleUsername" placeholder="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="strong password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplFirstname">First Name</Label>
                        <Input type="firstname" name="firstname" id="exampleFirstname" placeholder="first name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleLastname">Last Name</Label>
                        <Input type="lastname" name="lastname" id="exampleLastname" placeholder="last name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePrefferedName">Preffered Name</Label>
                        <Input type="prefferedname" name="prefferedname" id="examplePrefferedname" placeholder="prefferred name" />
                    </FormGroup>       
                    <FormGroup>
                        <Label for="exampleSelect">Institution</Label>
                        <Input type="select" name="select" id="exampleSelect">
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
  