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
    action: "Register",
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

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
    this.changeHanlder = this.changeHanlder.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  changeHanlder({ target }) {
    const value = target.value;
    this.setState({
      ...this.state,
      [target.name]: `${value}`
    });
  }

  registerHandler(e) {
    const { handleLogin } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    this.setState(
      {
        ...this.state,
        loading: true
      },
      () => {
        window.setTimeout(async () => {
          try {
            const response = await auth.post("registration", {
              email,
              password
            });
            const { status, data } = response;
            if (status === 201) {
              const { token } = data;
              handleLogin(token);
            }
          } catch (e) {
            this.setState(
              {
                ...this.state,
                error: true,
                errorMsg: "An error occurred",
                loading:false,
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

  onDismiss() {
    this.setState({
      ...this.state,
      error: false
    });
  }

  render() {
    const { info, email, password, error, errorMsg, loading } = this.state;
    return (
      <AuthWrapper error={error} onDismiss={this.onDismiss} errorMsg={errorMsg}>
        <Form
          info={info}
          actionHandler={this.registerHandler}
          changeHandle={this.changeHanlder}
          values={[email, password]}
          loading={loading}
          register
        />
      </AuthWrapper>
    );
  }
}
