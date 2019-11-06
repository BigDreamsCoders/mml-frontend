import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import Login from "./pages/Auth/Login/Login";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import { NotFound } from "./pages/404/404";
import FirstTimeGenres from "./pages/Genres/FirstTimeGenres";
import { LoginReducer } from "./reducers/Reducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ContextRoute } from "./components/Route/ContextRoute";
import { Constants } from "./utils/Constants";
import "pace-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Profile } from "./pages/Profile/Profile";
import { ErrorBoundary } from "./components/ErrorBoudary/ErrorBoudary";

const initState = {
	token: window.localStorage.getItem(Constants.TOKEN) || "",
};

const AuthContext = createContext();

const App = () => {
	const [state, dispatch] = useReducer(LoginReducer, initState);
	return (
		<ErrorBoundary>
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
					<ContextRoute
						path="/first-time"
						exact
						component={FirstTimeGenres}
						Context={AuthContext}
						value={state}
						dispatch={dispatch}
					/>
					<ContextRoute
						path="/me"
						exact
						component={Profile}
						Context={AuthContext}
						value={state}
						dispatch={dispatch}
					/>
					<Route path="/" component={NotFound} />
				</Switch>
			</Router>
		</ErrorBoundary>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
