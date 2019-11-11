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
		type: null,
		msg: null,
	},
	errorMsg: "",
	info: {
		action: "Register",
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

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initState };
	}

	changeHanlder({ target }) {
		const value = target.value;
		this.setState({
			...this.state,
			[target.name]: `${value}`,
		});
	}

	registerHandler(e) {
		const { handleLogin, history } = this.props;
		e.preventDefault();
		const { email, password } = this.state;
		this.setState(
			{
				...this.state,
				loading: true,
			},
			() => {
				window.setTimeout(async () => {
					try {
						const response = await auth.post("registration", {
							email,
							password,
						});
						const { status, data } = response;
						if (status === 201) {
							const { token } = data;
							handleLogin(token);
							history.push("/first-time");
						}
					} catch ({ request }) {
						let { response, status } = request;
						response = JSON.parse(response);
						const err = {
							error: true,
							msg: "",
						};
						switch (status) {
							case 401:
								err.msg = response.message;
								break;
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

	onDismiss() {
		this.setState({
			error: {
				hasError: false,
				type: null,
				msg: null,
			},
		});
	}

	render() {
		const { info, email, password, error, loading } = this.state;
		return (
			<AuthWrapper
				title="SignUp"
				error={error}
				onDismiss={() => {
					this.onDismiss();
				}}
			>
				<Form
					info={info}
					actionHandler={e => {
						this.registerHandler(e);
					}}
					changeHandle={e => {
						this.changeHanlder(e);
					}}
					values={[email, password]}
					loading={loading}
					register
				/>
			</AuthWrapper>
		);
	}
}

export default withRouter(SignUp);
