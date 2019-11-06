import React from "react";
import { Form } from "../../../components/Form";
import { auth } from "../../../axios/instance/auth";
import { AuthWrapper } from "../../../layout/Auth/AuthLayout";
import { withRouter } from "react-router-dom";

const initState = {
	email: "",
	password: "",
	loading: false,
	error: false,
	errorMsg: "",
	info: {
		action: "Login",
		data: [
			{
				name: "email",
				type: "email",
				label: "Email",
			},
			{
				name: "password",
				type: "password",
				label: "Password",
			},
		],
	},
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initState };
		this.loginHandler = this.loginHandler.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({
			...this.state,
			error: false,
		});
	}

	loginHandler(event) {
		event.preventDefault();
		const { handleLogin, history } = this.props;
		const { email, password } = this.state;
		this.setState(
			{
				...this.state,
				loading: true,
			},
			() => {
				window.setTimeout(async () => {
					console.log(process.env.REACT_APP_API_URL);
					try {
						const { data } = await auth.post("login", {
							email,
							password,
						});
						handleLogin(data.token);
						history.push("/me");
					} catch (error) {
						this.setState(
							{
								...this.state,
								error: true,
								loading: false,
								errorMsg: "Something gone wrong, try again",
							},
							() => {
								window.setTimeout(() => {
									this.setState({
										...this.state,
										error: false,
									});
								}, 2000);
							},
						);
					}
				}, 2000);
			},
		);
	}

	handleChange(event) {
		const value = event.target.value;
		this.setState({
			...this.state,
			[event.target.name]: `${value}`,
		});
	}

	render() {
		const { email, password, error, errorMsg, loading } = this.state;
		return (
			<AuthWrapper
				title="Login"
				error={error}
				onDismiss={this.onDismiss}
				errorMsg={errorMsg}
			>
				<Form
					info={this.state.info}
					actionHandler={this.loginHandler}
					changeHandle={this.handleChange}
					values={[email, password]}
					loading={loading}
					login
				/>
			</AuthWrapper>
		);
	}
}

export default withRouter(Login);
