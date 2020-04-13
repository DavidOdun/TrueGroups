import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Button, UncontrolledTooltip, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router'

class StudentPage extends Component {
    constructor(props)
    {
        super(props)        
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
        this.apiGetUserQuestion()
        this.apiGetClassInfo()
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
        if ((this.state.professorId > 0) && this.state.className)
        {
            let jForm = {
                "professor_id": this.state.professorId,
                "class_name": this.state.className,
                "user_id": this.state.userInfo.id
            }

            axios.post('/api/v1/classes/join',jForm)
                .then(addResponse => {
                    if (addResponse.data.success)
                    {
                        alert("Classes Succesfully Joined!")
                        this.setState({newClassDetail: addResponse.data.class_details})
                        this.apiGetClassInfo()
                    }
                })
                .catch(error => {
                    alert(error.response.data.dbError)
                });            
        }else{
            alert("Error: Not all Join Class Fields complete");
        }
    }

    apiSubmitSurvey()
    {
        /* API-Call to submit survey  -----> axios.post('api/v1/users/update/survey/:username') */
        if (Object.keys(this.state.surveyResponses).length === this.state.surveyQuestions.length)
        {
            axios.post('/api/v1/users/update/survey/'+this.state.userInfo.user_name, this.state.surveyResponses)
                .then(qRes => {
                    console.log(qRes)
                    alert("Survey Submitted Succesfully")
                });
                if (!this.state.completedSurvey)
                {
                    this.setState({completedSurvey: true})
                }
        }else{
            alert("Error: Not all questions have been answered")
        }
    }

    async apiGetClassInfo()
    {
        let classPageUI = []
        // Getting the List of all the classes that the student is in
        //axios.get('api/v1/classes/enrolled/'+this.state.userInfo.id)
        try{
            let enrolledClassList = await axios.get('api/v1/classes/enrolled/'+this.state.userInfo.id)
            for (var pos = 0; pos < enrolledClassList.data.length; pos++)
            {
                try{   
                    var classCode = enrolledClassList.data[pos].class_code.toString();
                    let currentClassDetails = await axios.get('api/v1/classes/details/'+classCode)
                    let structureTable = [];
                    try{
                        let currentGroupDetails = await axios.get('api/v1/classes/students/'+classCode+'/'+this.state.userInfo.id)
                        if (currentGroupDetails.data.length !== 0)
                        {
                            structureTable = this.structureGroupTable(currentGroupDetails.data);
                        }
                    } catch(err){
                        alert(err)
                    }
                    /* TODO: Move this above to the last try and check to see if there is any list given back */
                    classPageUI.push(
                        <div key={pos} className="card text-center">
                            <div className="card-header">
                                Class Name: {currentClassDetails.data[0].class_name}
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    {
                                        structureTable.length === 0 ?
                                        <h5> There are currenly No Created Groups for this class</h5> :
                                        structureTable
                                    }
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                Professor ID: {currentClassDetails.data[0].professor_id}
                            </div>
                        </div>
                    )
                    
                }catch(err){
                    alert(err)
                }
            }
            this.setState({classDisplayList: classPageUI})
        }catch(err){
            alert(err)
        }
    }

    structureGroupTable(groupList)
    {
        let tableHolder = [];

        for (var pos = 0; pos < groupList.length; pos++)
        {
            tableHolder.push(
                <tr key={pos}>
                    <th scope="row">{groupList[pos].group_code}</th>
                    <td>{groupList[pos].class_code}</td>
                    <td>{groupList[pos].member_id}</td>
                </tr>
            )
        }

        return(
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">GroupCode</th>
                <th scope="col">ClassCode</th>
                <th scope="col">MemberId</th>
                </tr>
            </thead>
            <tbody>
                {tableHolder}
            </tbody>
        </table>
        )
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
                        {this.state.classDisplayList.length !== 0 ?
                            this.state.classDisplayList :
                            <div> No Current Class. Join a Class Above</div>
                        }
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
  