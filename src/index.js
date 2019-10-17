import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { Login } from "./pages/Auth/Login/Login";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import { LoginReducer } from "./reducers/Reducer";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ContextRoute } from "./components/Route/ContextRoute";
import { Constants } from "./utils/Constants";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const initState = {
  token: window.localStorage.getItem(Constants.TOKEN) || ""
};

const AuthContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(LoginReducer, initState);
  return (
    <Router>
      <Switch>
        <ContextRoute
          path="/login"
          exact
          component={Login}
          Context={AuthContext}
          value={state}
          dispatch={dispatch}
        />
        <ContextRoute
          path="/register"
          exact
          component={SignUp}
          Context={AuthContext}
          value={state}
          dispatch={dispatch}
        />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
