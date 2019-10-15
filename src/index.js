import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/Auth/Login/Login";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={SignUp} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
