import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, UncontrolledTooltip, CustomInput } from 'reactstrap';
import { Redirect } from 'react-router'
import axios from 'axios';

class ProfessorPage extends Component {
    constructor(props)
    {
        super(props)        
        this.state = {
            className:"",
            classSize:"",
            surveyQuestions: [],
            pageRedirect: "",
            userAddedQuestions: "",     
            userDeletedQuestions: [],
            userInfo: props.location.state.user_data

        }
    }

    componentDidMount()
    {
        /* API Call to get user Survey Questions ---> axios.get('/api/v1/questions/all') */
        this.apiCallGetQuestions();

    }

    /* Create a fuction to get the axios call for questions */
    apiCallGetQuestions()
    {
        axios.get('/api/v1/questions/all')
            .then(qRes => {
                if (qRes.data.length !== 0)
                {
                    this.setState({surveyQuestions: qRes.data, userAddedQuestions: ""})
                }
            });
    }
    
    apiCallDeleteQuestions()
    {
        console.log("Called Deleted Questions")
        if (this.state.userDeletedQuestions.length === 0)
        {
            alert("No Value Selected.")
        }else{
            console.log("THERE IS SOMETHING BEING CALLED")
            for(var pos = 0; pos < this.state.userDeletedQuestions.length; pos++)
            {
                axios.post('/api/v1/questions/remove/'+this.state.userDeletedQuestions[pos])
                .then(addResponse => {
                    console.log("Response Below")
                    console.log(addResponse)
                })
                .catch(error => {
                    console.log(error.response)
                });
            }   
            alert("Delete: Submit Succesfully Completed!")
        }
        this.apiCallGetQuestions()    
    }

    apiCallAddQuestions()
    {
        let filteredQuestion = this.state.userAddedQuestions.split("\n").filter(item => item);
        console.log(filteredQuestion)

        for (var pos = 0; pos < filteredQuestion.length; pos++)
        {
            if (filteredQuestion[pos] === "")
                continue
            let tempForm = {
                "question_string": filteredQuestion[pos]
            } 
            axios.post('/api/v1/questions/add',tempForm)
                .then(addResponse => {
                    console.log("Response Below")
                    console.log(addResponse)
                })
                .catch(error => {
                    console.log(error.response)
                });
        }

        alert("Add: Submit Succesfully Completed!")
        this.apiCallGetQuestions()    
    }

    apiCreateClass()
    {
        console.log("About to create the classes")
        if ((this.state.classSize > 0) && this.state.className)
        {
            let jForm = {
                "professor_id": this.state.userInfo.id,
                "class_name": this.state.className,
                "max_member": this.state.classSize
            }

            axios.put('/api/v1/classes/create',jForm)
                .then(addResponse => {
                    console.log("Response Below")
                    console.log(addResponse)
                })
                .catch(error => {
                    console.log(error.response)
                });
            
            alert("Classes Succesfully Created!")
            window.location.reload()
        }else{
            alert("Error entering class creation information");
        }
    }

    structureModalQuestions(formType)
    {
        const userInputItems = []
        const formGroupItems = []
        const selectMultItems = []
        
        for (var pos = 0; pos < this.state.surveyQuestions.length; pos++)
        {
            if (formType === "/label")
            {
                formGroupItems.push
                (
                    <Label key={pos} for={this.state.surveyQuestions[pos].question_id.toString()}>{this.state.surveyQuestions[pos].question_id + ": " + this.state.surveyQuestions[pos].question_string}</Label>
                )
            }else if(formType === "/selectmultiple")
            {
                selectMultItems.push(
                    <option key={pos} value={this.state.surveyQuestions[pos].question_id}>{this.state.surveyQuestions[pos].question_string}</option>
                )
                
            }

        }
        if (formType === "/label")
        {
            userInputItems.push(<Form key={0}><FormGroup>{formGroupItems}</FormGroup></Form>);
        }else if(formType === "/selectmultiple")
        {
            userInputItems.push(
                <Form key={0}>
                    <FormGroup>
                        <Label for="removeSelect">Use CTRL or CMD to Select Multiple</Label>
                        <CustomInput type="select" id="removeSelect" name="customSelect" onChange={(e) => this.setState({userDeletedQuestions:[...e.target.selectedOptions].map(o => o.value)})} multiple>
                            {selectMultItems}
                        </CustomInput>
                    </FormGroup>
                </Form>
            )
        }
        return userInputItems;
    }

    render() {
        if (this.state.pageRedirect)
        {
            return <Redirect to={{ pathname: this.state.pageRedirect, state: {userInfo : this.state.userInfo }}}/>
        }

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
                        <Button size="lg" color="secondary" onClick={() => this.setState({pageRedirect: "/"})}> Logout </Button>

                    </div>
                </nav>

                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary btn-lg btn-block" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1">Manage Class Survey Questions</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Create New Class Room</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="collapse multi-collapse" id="multiCollapseExample1">
                            <div className="card card-body">
                                { this.state.surveyQuestions.length === 0 ? 
                                    <h3>No Current Questions. Use the Add button below to begin </h3> : 
                                    <h3>{this.structureModalQuestions("/label")}</h3>
                                }                                
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target=".addQ" >Add Questions</button>{' '}
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-danger btn-lg btn-block" data-toggle="modal" data-target=".removeQ">Remove Questions</button>{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="collapse multi-collapse" id="multiCollapseExample2">
                            <div className="card card-body">
                                <Form>
                                    <FormGroup>
                                        <Label for="cName">Class Name</Label>
                                        <Input type="text" name="clName" id="cName" onChange={(e) => this.setState({className: e.target.value})} placeholder="Operating System 90210" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="cSize">Maximumn Class Size</Label>
                                        <Input type="number" name="cSize" id="cSize" onChange={(e) => this.setState({classSize: e.target.value})} placeholder="25" />
                                    </FormGroup>
                                    <Button color="info" size="lg" onClick={() => this.apiCreateClass()} block>Create Class</Button>
                                </Form>                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade addQ" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">ADD: Survey Questions</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Label for="addQuestion">Enter Question(s) Below. SEPERATE MULTIPLE QUESTION WITH [ENTER]</Label>
                                <Input type="textarea" name="text" id="addQuestion" onChange={(e) => this.setState({userAddedQuestions: e.target.value})} placeholder= "What color is the sky?\n" />  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.apiCallAddQuestions()} data-dismiss="modal">Submit Changes</button>
                            </div>
                        </div>
                    </div>
                </div> 

                 <div className="modal fade removeQ" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">REMOVE: Survey Questions</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h3>{this.structureModalQuestions("/selectmultiple")}</h3>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.apiCallDeleteQuestions()} data-dismiss="modal">Submit Changes</button>
                            </div>
                        </div>
                    </div>
                </div>                                   
            </div>
      );
    }
  }
  
  export default withRouter(ProfessorPage);
  