import React from "react";
import { Form } from "../../../components/Form";
import { Alert } from "reactstrap";
import style from "./../Auth.module.css";
import { auth } from "../../../axios/instance/auth";

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
    const { info, email, password, error } = this.state;
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
            info={info}
            actionHandler={this.registerHandler}
            changeHandle={this.changeHanlder}
            values={[email, password]}
            register
          />
        </div>
      </main>
    );
  }
}
