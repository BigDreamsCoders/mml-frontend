import React from "react";
import { Form } from "../../components/Form";
import style from "./Login.module.css";
import { auth } from "../../axios/instance/auth";
import { Alert } from "reactstrap";

const initState = {
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

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const login = await auth.post("login", {
        email,
        password
      });
      console.log(login);
    } catch (error) {
      console.log(error);
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
    return (
      <main>
        <div className="Floating">{/* <Alert>que pex</Alert> */}</div>
        <video autoPlay muted loop id="video">
          <source src="video/concert.mp4" type="video/mp4" />
        </video>
        <div className={style.login}>
          <Form
            info={this.state.info}
            loginHandle={this.handleLogin}
            changeHandle={this.handleChange}
            values={[this.state.email, this.state.password]}
            login
          />
        </div>
      </main>
    );
  }
}
