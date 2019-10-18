import React from "react";
import { Form } from "../../../components/Form";
import { auth } from "../../../axios/instance/auth";
import { AuthWrapper } from "../Wrapper";

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
        label: "Email"
      },
      {
        name: "password",
        type: "password",
        label: "Password"
      }
    ]
  }
};

export class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...initState };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({
      ...this.state,
      error: false
    });
  }

  handleLogin(event) {
    const { handleLogin } = this.props;
    event.preventDefault();
    const { email, password } = this.state;
    this.setState(
      {
        ...this.state,
        loading: true
      },
      () => {
        window.setTimeout(async () => {
          try {
            const { data } = await auth.post("login", {
              email,
              password
            });
            handleLogin(data.token);
          } catch (error) {
            this.setState(
              {
                ...this.state,
                error: true,
                loading: false,
                errorMsg: "Something gone wrong, try again"
              },
              () => {
                window.setTimeout(() => {
                  this.setState({
                    ...this.state,
                    error: false
                  });
                }, 2000);
              }
            );
          }
        }, 2000);
      }
    );
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: `${value}`
    });
  }

  render() {
    const { email, password, error, errorMsg, loading } = this.state;
    return (
      <AuthWrapper error={error} onDismiss={this.onDismiss} errorMsg={errorMsg}>
        <Form
          info={this.state.info}
          actionHandler={this.handleLogin}
          changeHandle={this.handleChange}
          values={[email, password]}
          loading={loading}
          login
        />
      </AuthWrapper>
    );
  }
}
