import React from "react";
import { Form } from "../../../components/Form";
import style from "./../Auth.module.css";
import { auth } from "../../../axios/instance/auth";
import { Alert } from "reactstrap";

const initState = {
  email: "",
  password: "",
  error: false,
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

  async handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const { data } = await auth.post("login", {
        email,
        password
      });
      window.localStorage.setItem("token", data.token);
    } catch (error) {
      this.setState(
        {
          ...this.state,
          error: true
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

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: `${value}`
    });
  }

  render() {
    const { error } = this.state;
    return (
      <main>
        <div className={style.floating}>
          <Alert color="danger" isOpen={error} toggle={this.onDismiss}>
            que pex
          </Alert>
        </div>
        <video autoPlay muted loop id="video">
          <source src="video/concert.mp4" type="video/mp4" />
        </video>
        <div className={style.login}>
          <Form
            info={this.state.info}
            actionHandler={this.handleLogin}
            changeHandle={this.handleChange}
            values={[this.state.email, this.state.password]}
            login
          />
        </div>
      </main>
    );
  }
}
