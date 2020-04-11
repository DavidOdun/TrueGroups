import React, { Component } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	UncontrolledTooltip,
} from "reactstrap";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

class EditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			username: "",
			password: "",
			preferredname: "",
			institution: "",
			pageRedirect: "",
			userInfo: props.location.state.userInfo,
		};
	}

	async handleUpdate() {
		let jForm = {};
		var change = false;
		if (this.state.email) {
			jForm["email"] = this.state.email;
			change = true;
		}
		if (this.state.username) {
			jForm["username"] = this.state.username;
			change = true;
		}
		if (this.state.password) {
			jForm["password"] = this.state.password;
			change = true;
		}
		if (this.state.preferredname) {
			jForm["preferredname"] = this.state.preferredname;
			change = true;
		}
		if (this.state.institution) {
			jForm["institution"] = this.state.institution;
			change = true;
		}
		if (change) {
			/* Make API call: axios.post('/api/v1/users/update/basic/:username) */
			const response = await axios.post(
				"/api/v1/users/update/basic/" + this.state.userInfo.user_name,
				jForm
			);

			if (response.data.dbError) {
				alert(response.data.dbError);
			} else if (response.data.error) {
				alert(response.data.error);
			} else {
				alert("Update Successful!");
				this.setState({ pageRedirect: "/signin" });
			}
		} else {
			alert("No Change found on the Page");
		}
	}

	render() {
		console.log(this.state);
		if (this.state.pageRedirect) {
			console.log("Found Page Redirect True");
			return <Redirect to={this.state.pageRedirect} />;
		}
		return (
			<div>
				<nav className="navbar navbar-light bg-light justify-content-between">
					<a
						className="navbar-brand"
						href="/"
						id="UncontrolledTooltipExample"
					>
						<img
							src="/TrueGroupLogo.png"
							width="150"
							height="150"
							alt="True Group Company Logo"
						></img>
						<UncontrolledTooltip
							placement="right"
							target="UncontrolledTooltipExample"
						>
							Click to return Home
						</UncontrolledTooltip>
					</a>
					<h1>True Groups: Edit Profile</h1>
					<div></div>
				</nav>
				<div className="container">
					<Form>
						<FormGroup>
							<Label for="exampleEmail">Email</Label>
							<Input
								type="email"
								name="email"
								id="exampleEmail"
								onChange={(e) =>
									this.setState({ email: e.target.value })
								}
								placeholder="example@example.com"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="exampleUsername">Username</Label>
							<Input
								type="username"
								name="usernmae"
								id="exampleUsername"
								onChange={(e) =>
									this.setState({ username: e.target.value })
								}
								placeholder="username"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="examplePassword">Password</Label>
							<Input
								type="password"
								name="password"
								id="examplePassword"
								onChange={(e) =>
									this.setState({ password: e.target.value })
								}
								placeholder="strong password"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="examplepreferredName">
								preferred Name
							</Label>
							<Input
								type="preferredname"
								name="preferredname"
								id="examplepreferredname"
								onChange={(e) =>
									this.setState({
										preferredname: e.target.value,
									})
								}
								placeholder="prefferred name"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="exampleSelect">Institution</Label>
							<Input
								type="select"
								name="select"
								id="exampleSelect"
								onChange={(e) =>
									this.setState({
										institution: e.target.value,
									})
								}
							>
								<option>University of Notre Dame</option>
								<option>Holy Cross College</option>
								<option>Michigan State</option>
								<option>Indiana University South Bend</option>
								<option>Saint Mary's College</option>
							</Input>
						</FormGroup>
						<Button
							color="primary"
							size="lg"
							onClick={() => this.handleUpdate()}
							block
						>
							Update
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default withRouter(EditPage);
