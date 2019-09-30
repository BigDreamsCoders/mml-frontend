import React from "react";
import { Form } from "../components/Form";
import "./Login.module.css";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    console.log(this.state.email, this.state.password);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: `${value}`
    });
  }

  render() {
    return (
      <main>
        <Form
          info={this.state.info}
          loginHandle={this.handleLogin}
          changeHandle={this.handleChange}
          values={[this.state.email, this.state.password]}
        />
      </main>
    );
  }
}
