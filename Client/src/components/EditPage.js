import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';

class EditPage extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            email: " ",
            username: " ",
            password: " ",
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
        2. Button Pressed
            a. Display User Entry on Button Press
            b. Make Update to Database
        3. Redirect to Home Page
    */

    render() {
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
                    <h1>True Groups: Edit Profile</h1>
                    <div></div>
                </nav>
                <div class="container">
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
                    <Button color="primary" size="lg" block>Update</Button>
                </Form>
                </div>
            </div>
      );
    }
  }
  
  export default EditPage;
  