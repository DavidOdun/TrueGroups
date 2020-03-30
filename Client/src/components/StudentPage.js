import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Button, UncontrolledTooltip, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const tempQuestions = ["Q1---?", "Q2---?", "Q3---?", "Q4---?", "Q5---?", "Q6---?", "Q7---?", "Q8---?", "Q8---?", "Q9---?"]

class HomePage extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            apiResponse: "",
            surveyQuestions: tempQuestions,
            surveyResponses: {},
            completedSurvey: false,
            /* TODO: Save User Information from Props */
            userInfo: "",
        }
    }

    componentDidMount()
    {
        /* TODO: API Call to get user Survey Questions */

        /*
        console.log("Making User Name Api Call")
        axios.get('/api/v1/users/get/:user_name')
            .then(res => this.setState({apiResponse: res.data}))
        console.log("Finished Making User Name Api Call")
        */
    }
    handleButtonPress(value)
    {
        this.props.history.push(value);
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
                    <h1>Welcome, NAME</h1>
                    <div>
                        {/* TODO-Add Buttons: 1. Edit Profile Page, 2. Edit Survey 3. Logout*/}
                        <Button size="lg" color="primary" onClick={() => this.handleButtonPress("/signup")}> Edit Profile</Button>{' '}
                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg">Edit Survey</button>{' '}
                        <Button size="lg" color="secondary" onClick={() => this.handleButtonPress("/")}> Logout </Button>

                    </div>
                </nav>
                {/* TODO: Block Button -- Complete User Survey Ternery Expression --> Link to Survey Page*/}
                { this.state.completedSurvey ? 
                    <div></div> : 
                    <button type="button" className="btn btn-info btn-lg btn-block" data-toggle="modal" data-target=".bd-example-modal-lg">
                        Complete User Survey!
                    </button>
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* TODO: Input Box to Get Class Code*/}

                {/* TODO:
                    1. 
                
                */}
                    
            </div>
      );
    }
  }
  
  export default withRouter(HomePage);
  