import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Form = props => {
  return (
    <form>
      {props.info.data.map((self, index) => {
        return (
          <div className="form-group" key={index}>
            <input
              className="form-control"
              type={self.type}
              name={self.name}
              placeholder={self.name}
              onChange={props.changeHandle}
              value={props.values[index]}
            />
          </div>
        );
      })}
      <button className="btn btn-primary" onClick={props.actionHandler}>
        {props.info.action}
      </button>
      {props.login && <Link to="/register">Don't have an account?</Link>}
      {props.register && <Link to="/login">Have an account?</Link>}
    </form>
  );
};

Form.propTypes = {
  info: PropTypes.object.isRequired,
  changeHandle: PropTypes.func.isRequired,
  actionHandler: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  login: PropTypes.bool,
  register: PropTypes.bool
};
