import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Button, UncontrolledTooltip, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
// import axios from 'axios';
import { Redirect } from 'react-router'

const tempQuestions = ["Q1---?", "Q2---?", "Q3---?", "Q4---?", "Q5---?", "Q6---?", "Q7---?", "Q8---?", "Q8---?", "Q9---?"]

class HomePage extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            apiResponse: "",
            surveyQuestions: tempQuestions,
            surveyResponses: {},
            completedSurvey: true,
            pageRedirect: "",
            userInfo: props.location.state.user_data,
        }
    }

    componentDidMount()
    {
        /* TODO: API Call to get user Survey Questions ---> axios.get('/api/v1/questions/all') */

        /* TODO: API Call to get all user Classes ---> axios.get('api/v1/classes/enrolled/:user_id') */

        /* TODO: Set the survey questions state based on the Api Responses*/
    }

    handleButtonPress(value)
    {
        switch(value)
        {
            case "joinclass":
                console.log("Joining Class");
                /* TODO: API-Call to join class  -----> axios.post('api/v1/classes/join') */

                /* TODO: Call function that pass class Information to made by the cards */
                break;

            case "submitsurvey":
                console.log("Submitting Survey");
                /* TODO: API-Call to submit survey  -----> axios.post('api/v1/users/update/survey/:username') */
                break;

            default:
                break;
        }
    }

    structureModalQuestions()
    {
        const userInputItems = []
        const formGroupItems = []
        
        for (var pos = 0; pos < this.state.surveyQuestions.length; pos++)
        {
            var temp = pos+1;
            let qName = "Q"+temp;

            formGroupItems.push
            (
                <FormGroup key={pos}> 
                    <Label for={qName}>{qName + ": " + this.state.surveyQuestions[pos]}</Label>
                    <Input type="select" name="select" id={qName} onChange={(e) => this.setState({surveyResponses: { ...this.state.surveyResponses, [qName]:e.target.value }})}>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
            )
        }
        userInputItems.push(<Form key={0}>{formGroupItems}</Form>);
        return userInputItems;
    }

    render() {
        if (this.state.pageRedirect)
        {
            return <Redirect to= {this.state.pageRedirect} />
        }

        /* Block Complete Survey Buttons */
        var surveyButton = <button type="button" className="btn btn-info btn-lg btn-block" data-toggle="modal" data-target=".bd-example-modal-lg">Complete User Survey!</button>
        
        /* Join a Class Input and Button */
        var joinClass = <InputGroup size="lg">         
                            <Input placeholder="Enter Class Code e.g. 1010"/>
                            <InputGroupAddon addonType="append"><Button onClick={() => this.handleButtonPress("joinclass")}>Join a Class</Button></InputGroupAddon>
                        </InputGroup>
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

                    {/* Get User Name passed as a prop and update the name below*/}
                    {this.state.userInfo.preferred_first_name ? <h1>Welcome, {this.state.userInfo.preferred_first_name}</h1> : <h1>Welcome, {this.state.userInfo.first_name}</h1>}
                    
                    <div>
                        {/* Buttons: 1. Edit Profile Page, 2. Edit Survey 3. Logout*/}
                        <Button size="lg" color="primary" onClick={() => this.props.history.push("/editprofile")}> Edit Profile</Button>{' '}
                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg">Edit Survey</button>{' '}
                        <Button size="lg" color="secondary" onClick={() => this.setState({pageRedirect: "/"})}> Logout </Button>

                    </div>
                </nav>

                {/* Block Button -- Complete User Survey Ternery Expression --> Link to Survey Page */}
                { this.state.completedSurvey ? 
                    joinClass : 
                    surveyButton
                }

                <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">User Survey Questions</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.structureModalQuestions()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
                                <Button size="lg" color="primary" onClick={() => this.handleButtonPress("submitsurvey")}> Submit Changes </Button>
                            </div>
                        </div>
                    </div>
                </div>                  
            </div>
      );
    }
  }
  
  export default withRouter(HomePage);
  