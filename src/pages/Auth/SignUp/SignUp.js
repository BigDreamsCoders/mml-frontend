import React from "react";
import { Form } from "../../../components/Form";
import { auth } from "../../../axios/instance/auth";
import { AuthWrapper } from "../Wrapper";

const initState = {
  email: "",
  password: "",
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

  async registerHandler(e) {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await auth.post("registration", {
        email,
        password
      });
      console.log(response);
    } catch (e) {
      this.setState(
        {
          ...this.state,
          error: true,
          errorMsg: "An error occurred"
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
  }

  onDismiss() {
    this.setState({
      ...this.state,
      error: false
    });
  }

  render() {
    const { info, email, password, error, errorMsg } = this.state;
    return (
      <AuthWrapper error={error} onDismiss={this.onDismiss} errorMsg={errorMsg}>
        <Form
          info={info}
          actionHandler={this.registerHandler}
          changeHandle={this.changeHanlder}
          values={[email, password]}
          register
        />
      </AuthWrapper>
    );
  }
}
