import React, { Component } from "react";
import {
	UncontrolledAlert,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	UncontrolledTooltip,
} from "reactstrap";
import { Redirect } from "react-router";
import axios from "axios";

const initialState = {
	page_alert: "",
	email: "",
	email_error: "",
	username: "",
	username_error: "",
	password: "",
	password_error: "",
	firstname: "",
	firstname_error: "",
	lastname: "",
	lastname_error: "",
	preferredname: "",
	preferredname_error: "",
	institution: "",
	institution_error: "",
	userrole: "",
	userrole_error: "",
	page_redirect: false,
};

class SignUpPage extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	validateForm = () => {
		let email_error = "";
		let username_error = "";
		let password_error = "";
		let firstname_error = "";
		let lastname_error = "";
		let preferredname_error = "";
		let institution_error = "";
		let userrole_error = "";

		/* Validate Email: include @, include edu (comment out) */
		if (
			!this.state.email.includes("@") ||
			!this.state.email.includes(".") ||
			this.state.email.length < 5
		) {
			email_error = "Invalid Email Entry";
		}

		/* Validate Username: make sure not null */
		if (!this.state.username) {
			username_error = "Invalid or No Username Entered";
		}

		/* Validate Password: make sure not null */
		if (!this.state.password) {
			password_error = "Invalid or No Password Entered";
		}

		/* Validate FirstName: make sure not null */
		if (!this.state.firstname) {
			firstname_error = "Invalid or No First Name Entered";
		}

		/* Validate Lastname: make sure not null */
		if (!this.state.lastname) {
			lastname_error = "Invalid or No Last Name Entered";
		}

		/* Validate PreferredName: make sure not null */
		if (!this.state.preferredname) {
			preferredname_error = "Invalid or No Preferred Name Entered";
		}

		/* Validate Userrole: make sure not null */
		if (!this.state.userrole) {
			userrole_error = "Invalid or No User Role Selected";
		}

		/* Validate Insitution: make sure not null */
		if (!this.state.institution) {
			institution_error = "Invalid or No Institution Selected";
		}
		/* If there are any errors, go head and set them to state and return false*/
		if (
			email_error ||
			username_error ||
			password_error ||
			firstname_error ||
			lastname_error ||
			preferredname_error ||
			userrole_error ||
			institution_error
		) {
			this.setState({
				email_error: email_error,
				username_error: username_error,
				password_error: password_error,
				firstname_error: firstname_error,
				lastname_error: lastname_error,
				preferredname_error: preferredname_error,
				userrole_error: userrole_error,
				institution_error: institution_error,
			});
			return false;
		}
		return true;
	};

	async handleSubmit() {
		console.log("In the Handle Submit Function");
		/* Check Validity of all the user entered */
		const isValid = this.validateForm();

		/* Valid: True */
		if (isValid) {
			console.log("The entire Form was valid!");

			/* Make API call with valid entry form */
			let response = await axios.put("/api/v1/users/create", {
				first_name: this.state.firstname,
				last_name: this.state.lastname,
				preferred_first_name: this.state.preferredname,
				user_name: this.state.username,
				email: this.state.email,
				password: this.state.password,
				user_type: this.state.userrole,
				institution: this.state.institution,
			});

			/* Check API Response to entire*/
			console.log("Response: ");
			console.log(response.data);

			/* Bad API Response: Alert the Page, Reset the State and Entire field*/
			if (response.data.dbError) {
				console.log(response.data.dbError);
				this.setState({
					page_alert: response.data.dbError,
					username_error: "Invalid username entered",
				});
			} /* Good API Response: Push to specific user profile page*/ else {
				alert("Welcome! New User Added: " + this.state.username);
				// TODO: Push to Private Route
				console.log("About to Redirect");
				this.setState({ page_redirect: true });
			}
		} else {
			console.log("Parts of the form were invalid!");
			this.render();
		}
	}
	/* 
        ToDo:
        1. Save the user input as a part of this components state: Done:
        2. Display User Entry on Button Press
        3. Redirect to new page on button pressed
        4. Notification for Created Profile
    */
	render() {
		console.log("In the Render Function");
		console.log(this.state);
		if (this.state.page_redirect) {
			console.log("Found Page Redirect True");
			return <Redirect to="/signin" />;
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
					<h1>True Groups</h1>
					<div></div>
				</nav>
				<div className="container mt-3 mb-3">
					{this.state.page_alert ? (
						<div>
							<UncontrolledAlert color="danger" fade={false}>
								{this.state.page_alert}
							</UncontrolledAlert>
						</div>
					) : null}
					<Form>
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.email_error}
						</div>
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
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.username_error}
						</div>
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
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.password_error}
						</div>
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
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.firstname_error}
						</div>
						<FormGroup>
							<Label for="examplFirstname">First Name</Label>
							<Input
								type="firstname"
								name="firstname"
								id="exampleFirstname"
								onChange={(e) =>
									this.setState({ firstname: e.target.value })
								}
								placeholder="first name"
							/>
						</FormGroup>
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.lastname_error}
						</div>
						<FormGroup>
							<Label for="exampleLastname">Last Name</Label>
							<Input
								type="lastname"
								name="lastname"
								id="exampleLastname"
								onChange={(e) =>
									this.setState({ lastname: e.target.value })
								}
								placeholder="last name"
							/>
						</FormGroup>
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.preferredname_error}
						</div>
						<FormGroup>
							<Label for="examplepreferredName">
								Preferred Name
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
								placeholder="preferred name"
							/>
						</FormGroup>
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.userrole_error}
						</div>
						<FormGroup>
							<Label for="exampleRole">User Role</Label>
							<Input
								type="select"
								name="select"
								id="exampleRole"
								onChange={(e) =>
									this.setState({ userrole: e.target.value })
								}
							>
								<option></option>
								<option>Student</option>
								<option>Professor</option>
							</Input>
						</FormGroup>
						<div style={{ fontSize: 12, color: "red" }}>
							{this.state.institution_error}
						</div>
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
								<option></option>
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
							onClick={() => this.handleSubmit()}
							block
						>
							Submit
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default SignUpPage;
