import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Button, UncontrolledTooltip, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router'

class StudentPage extends Component {
    constructor(props)
    {
        super(props)        
        console.log("Props called in Student Page")
        console.log(props)
        this.state = {
            apiResponse: "",
            surveyQuestions: [],
            surveyResponses: {},
            completedSurvey: true,
            userEnrolledClass:[],
            newClassDetail: {},
            pageRedirect: "",
            professorId: 0,
            className: "",
            classDisplayList: [],
            userInfo: props.location.state.user_data,
        }
    }

    componentDidMount()
    {
        axios.get('/api/v1/classes/details/1')
        .then(addResponse => {
            console.log("Class Details Response Below")
            console.log(addResponse)
        })
        .catch(error => {
            console.log(error.response)
        });
        this.apiGetUserQuestion()
        this.apiEnrolledClasses()
        this.structureClassDetails()
    }

    apiGetUserQuestion()
    {
        /* API Call to get user Survey Questions ---> axios.get('/api/v1/questions/all') */
        axios.get('/api/v1/questions/all')
            .then(qRes => {
                if (qRes.data.length !== 0)
                {
                    this.setState({surveyQuestions: qRes.data})
                }
            });
    }

    apiJoinClass()
    {
        console.log("About to join the classes")
        if ((this.state.professorId > 0) && this.state.className)
        {
            let jForm = {
                "professor_id": this.state.professorId,
                "class_name": this.state.className,
                "user_name": this.state.userInfo.id
            }

            axios.post('/api/v1/classes/join',jForm)
                .then(addResponse => {
                    console.log("Response Below")
                    console.log(addResponse)
                    if (addResponse.data.success)
                    {
                        alert("Classes Succesfully Joined!")
                        this.apiEnrolledClasses()
                        this.setState({newClassDetail: addResponse.data.class_details})
                    }
                })
                .catch(error => {
                    console.log(error.response)
                    alert(error.response.data.dbError)
                });            
        }else{
            alert("Error: Not all Join Class Fields complete");
        }
    }

    apiSubmitSurvey()
    {
        console.log("Submitting Survey");
        /* TODO: API-Call to submit survey  -----> axios.post('api/v1/users/update/survey/:username') */
        if (Object.keys(this.state.surveyResponses).length === this.state.surveyQuestions.length)
        {
            console.log("All Questions answered")
            let jForm = JSON.stringify(this.state.surveyResponses)
            console.log(jForm)
            axios.post('/api/v1/users/update/survey/'+this.state.userInfo.user_name, this.state.surveyResponses)
                .then(qRes => {
                    console.log("Response Below")
                    console.log(qRes)
                });
                alert("Survey Submitted Succesfully")
                if (!this.state.completedSurvey)
                {
                    this.setState({completedSurvey: true})
                }
        }else{
            alert("Error: Not all questions have been answered")
        }
    }

    apiEnrolledClasses()
    {
        /* TODO: API Call to get all user Classes ---> axios.get('api/v1/classes/enrolled/:user_id') */
        //axios.get('api/v1/classes/enrolled/'+this.state.userInfo.id)
        axios.get('api/v1/classes/enrolled/2')
            .then(addResponse => {
                console.log("Response Below")
                console.log(addResponse)
                if(!addResponse.data.error){
                    this.setState({userEnrolledClass: addResponse.data})
                }
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.dbError)
            });  
    }

    apiGetClassDetails()
    {
        if (this.state.userEnrolledClass.length === 0)
        {
            alert("This User is not enrolled in any classes");
        }else{
            for(var pos = 0; pos < this.state.userEnrolledClass.length; pos++)
            {
                axios.get('/api/v1/classes/details/'+this.state.userEnrolledClass[pos].class_code)
                    .then(addResponse => {
                        console.log("Class Details Response Below")
                        console.log(addResponse)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
            }   
            alert("Delete: Submit Succesfully Completed!")
        }
    }
            /*
            let groupResponse = await axios.get('/api/v1/classes/students/'+this.state.userEnrolledClass[pos].class_code+'/'+this.state.userInfo.id)
            console.log("Group Response Below")
            console.log(groupResponse)
            */

    async structureClassDetails()
    {
        const allUserClass = [] 
        for(var pos = 0; pos < this.state.userEnrolledClass.length; pos++)
        {   
            /* Get the class details '/api/v1/classes/details/:class_code/' */
            let addResponse = await axios.get('api/v1/classes/details/'+this.state.userEnrolledClass[pos].class_code)
            console.log("Add Response Below:")
            console.log(addResponse)
            allUserClass.push(
                <div key={pos} className="card text-center">
                    <div className="card-header">
                        Class Name: {addResponse.data[0].class_name}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">There are no Current Groups</p>
                    </div>
                    <div className="card-footer text-muted">
                        Professor ID: {addResponse.data[0].professor_id}
                    </div>
                </div>
            )
            console.log("In function User Class Length: " + allUserClass.length)
        }
        this.setState({classDisplayList: allUserClass})
    }

    structureModalQuestions()
    {
        const userInputItems = []
        const formGroupItems = []
        
        for (var pos = 0; pos < this.state.surveyQuestions.length; pos++)
        {
            let qName="Q"+ this.state.surveyQuestions[pos].question_id.toString();
            formGroupItems.push
            (
                <FormGroup key={pos}> 
                    {/* <Label for={qName}>{qName + ": " + this.state.surveyQuestions[pos].question_string}</Label> */}
                    <Label key={pos} for={qName}>{this.state.surveyQuestions[pos].question_id + ": " + this.state.surveyQuestions[pos].question_string}</Label>
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
            return <Redirect to={{ pathname: this.state.pageRedirect, state: {userInfo : this.state.userInfo }}}/>
        }

        /* Block Complete Survey Buttons */
        var surveyButton = <button type="button" className="btn btn-info btn-lg btn-block" data-toggle="modal" data-target=".bd-example-modal-lg">Complete User Survey!</button>
        var joinClass = <button type="button" className="btn btn-info btn-lg btn-block" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1">Join a Class</button>
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
                        <Button size="lg" color="primary" onClick={() => this.setState({pageRedirect: "/editprofile"})}> Edit Profile</Button>{' '}
                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg">Edit Survey</button>{' '}
                        <Button size="lg" color="secondary" onClick={() => this.setState({pageRedirect: "/"})}> Logout </Button>

                    </div>
                </nav>

                {/* Block Button -- Complete User Survey Ternery Expression --> Link to Survey Page */}
                { this.state.completedSurvey ? 
                    joinClass : 
                    surveyButton
                }
                <div className="row">
                    <div className="col">
                        <div className="collapse multi-collapse" id="multiCollapseExample1">
                            <div className="card card-body">
                                <Form>                                    
                                    <FormGroup>
                                        <Label for="cSize">Professor ID</Label>
                                        <Input type="number" name="cSize" id="cSize" onChange={(e) => this.setState({professorId: e.target.value})} placeholder="25" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="cName">Class Name</Label>
                                        <Input type="text" name="clName" id="cName" onChange={(e) => this.setState({className: e.target.value})} placeholder="Operating System 90210" />
                                    </FormGroup>
                                    <Button color="info" size="lg" onClick={() => this.apiJoinClass()} block>Submit Join Class Request</Button>
                                </Form>                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {this.state.classDisplayList}
                    </div>
                </div>

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
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.apiSubmitSurvey()} data-dismiss="modal">Submit Changes</button>
                            </div>
                        </div>
                    </div>
                </div>                  
            </div>
      );
    }
  }
  
  export default withRouter(StudentPage);
  