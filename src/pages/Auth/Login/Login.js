import React from "react";
import { Form } from "../../../components/Form";
import { auth } from "../../../axios/instance/auth";
import { AuthWrapper } from "../../../layout/Auth/AuthLayout";
import { withRouter } from "react-router-dom";

const initState = {
	email: "",
	password: "",
	loading: false,
	error: {
		hasError: false,
		msg: null,
	},
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
	}

	onDismiss() {
		this.setState({
			error: {
				hasError: false,
				type: null,
				msg: null,
			},
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
					try {
						const { data } = await auth.post("login", {
							email,
							password,
						});
						handleLogin(data.token);
						history.push("/me");
					} catch ({ request }) {
						let { response, status } = request;
						response = JSON.parse(response);
						console.log(response, status);
						const err = {
							error: true,
							msg: "",
						};
						switch (status) {
							case 422:
								err.msg = response.errors.reduce(
									(prev, self) => {
										return `${prev} ${self.split(":")[1]},`;
									},
									"",
								);
								err.msg = err.msg.substring(
									0,
									err.msg.length - 1,
								);
								break;
							default:
								err.msg = "An error ocurred, try later";
								break;
						}
						this.setState({
							error: err,
							loading: false,
						});
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
		const { email, password, error, loading } = this.state;
		return (
			<AuthWrapper
				title="Login"
				error={error}
				onDismiss={() => {
					this.onDismiss();
				}}
			>
				<Form
					info={this.state.info}
					actionHandler={e => {
						this.loginHandler(e);
					}}
					changeHandle={e => {
						this.handleChange(e);
					}}
					values={[email, password]}
					loading={loading}
					login
				/>
			</AuthWrapper>
		);
	}
}

export default withRouter(Login);
