import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { Redirect } from 'react-router'

class ProfessorPage extends Component {
    constructor(props)
    {
        super(props)        
        this.state = {
            pageRedirect: ""
        }
    }

    componentDidMount()
    {

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
                    <h1>Welcome, Mary</h1>
                    
                    <div>
                        {/* Buttons: 1. Edit Profile Page, 2. Edit Survey 3. Logout*/}
                        <Button size="lg" color="primary" onClick={() => this.setState({pageRedirect: "/editprofile"})}> Edit Profile</Button>{' '}
                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg">Edit Survey</button>{' '}
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
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="collapse multi-collapse" id="multiCollapseExample2">
                            <div className="card card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      );
    }
  }
  
  export default withRouter(ProfessorPage);
  