import React, { Component } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	UncontrolledTooltip,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router";

class SignInPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			email_error: "",
			password_error: "",
			user_data: {},
			private_redirect: false,
		};
	}

	async handleSubmit() {
		let e_error = "";
		let p_error = "";
		let p_redirect = false;
		let response_data = {};

		if (this.state.email && this.state.password) {
			let jForm = {
				email: this.state.email,
				password: this.state.password,
			};

			let response = await axios.post(
				"/api/v1/users/authenticate",
				jForm
			);

			if (response.data.dbError) {
				alert(response.data.dbError);
				e_error = response.data.dbError;
			} else if (response.data.error) {
				alert(response.data.error);
				p_error = response.data.error;
			} else {
				alert("Login Successful!");
				p_redirect = true;
				response_data = response.data;
			}
		} else {
			if (
				!this.state.email ||
				!this.state.email.includes("@") ||
				!this.state.email.includes(".") ||
				this.state.email.length < 5
			) {
				console.log("No Email Entered!");
				e_error = "Error Entering Email Address";
			}
			if (!this.state.password) {
				console.log("No Password Entered!");
				p_error = "Error Entering Password";
			}
		}

		this.setState({
			email_error: e_error,
			password_error: p_error,
			private_redirect: p_redirect,
			user_data: response_data,
		});
	}
	/* 
        ToDo:
        1. Save the user input as a part of this components state: Done
        2. Display User Entry on Button Press (For Testing): Done
        3. On Button Click: Verify correctness of login information
            - Important Bug: Do not display the user name and password on submit
            a. Redirect to new page (Class Info) on button pressed
            b. Notify and redirect to current page on failed login
    */
	render() {
		console.log("Showing State for the user");
		console.log(this.state);
		if (this.state.private_redirect) {
			/* TODO: Make a private route */
			/* REDIRECT TO PRIVATE USER HOME PAGE: STUDENT OR PROFESSOR */

			if (this.state.user_data.user_type === "Student") {
				return (
					<Redirect
						to={{
							pathname: "/studentpage",
							state: { user_data: this.state.user_data },
						}}
					/>
				);
			} else if (this.state.user_data.user_type === "Professor") {
				return (
					<Redirect
						to={{
							pathname: "/professorpage",
							state: { user_data: this.state.user_data },
						}}
					/>
				);
			}
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
				<div className="container mt-3">
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
								placeholder="email"
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
						<Button
							color="primary"
							size="lg"
							onClick={() => this.handleSubmit()}
							block
						>
							Login
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default SignInPage;
