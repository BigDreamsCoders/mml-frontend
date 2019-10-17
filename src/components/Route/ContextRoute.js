import React from "react";
import { Route } from "react-router-dom";
import { LoginAction } from "../../actions/Action";

export const ContextRoute = ({
  Context,
  component,
  value,
  dispatch,
  ...rest
}) => {
  const { Provider, Consumer } = Context;
  const Component = component;
  return (
    <Route {...rest}>
      <Provider
        value={{
          ...value,
          handleLogin: token => {
            dispatch({ type: LoginAction.LOGIN, payload: token });
          },
          handleLogout: token => {
            dispatch({ type: LoginAction.LOGOUT, payload: token });
          }
        }}
      >
        <Consumer>
          {props => {
            return <Component {...props} />;
          }}
        </Consumer>
      </Provider>
    </Route>
  );
};
