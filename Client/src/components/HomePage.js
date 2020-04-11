import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";

class HomePage extends Component {
	handleButtonPress(value) {
		this.props.history.push(value);
	}

	render() {
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
					<h1>Welcome to True Groups</h1>
					<div>
						<Button
							size="lg"
							color="primary"
							onClick={() => this.handleButtonPress("./signup")}
						>
							{" "}
							Register
						</Button>{" "}
						<Button
							size="lg"
							color="secondary"
							onClick={() => this.handleButtonPress("./signin")}
						>
							{" "}
							Login{" "}
						</Button>
					</div>
				</nav>
				<div className="row justify-content-center bg-light">
					<div className="col align-self-center">
						<h1 className="text-primary text-center">
							What is TrueGroups?
						</h1>
						<h4 className="text-secondary text-center">
							TrueGroup is an unbiased group creator
						</h4>
						<h6 className="text-success text-center">
							It improves group dynamics which leads to a smoother
							learning experience for the classroom
						</h6>
					</div>
					<div className="col">
						<img
							src="/StudentsWorking.jpg"
							className="img-fluid"
							alt="Student working around computer"
						></img>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(HomePage);
