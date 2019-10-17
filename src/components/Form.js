import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input, Button } from "reactstrap";
import PropTypes from "prop-types";

export const Form = props => {
  const { login, register, info, values, changeHandle, actionHandler } = props;
  return (
    <form>
      {props.info.data.map((self, index) => {
        return (
          <FormGroup key={index}>
            <Input
              type={self.type}
              name={self.name}
              placeholder={self.name}
              onChange={changeHandle}
              value={values[index]}
            />
          </FormGroup>
        );
      })}
      <Button className="btn btn-primary" onClick={actionHandler}>
        {info.action}
      </Button>
      {login && <Link to="/register">Don't have an account?</Link>}
      {register && <Link to="/login">Have an account?</Link>}
    </form>
  );
};

Form.propTypes = {
  info: PropTypes.shape({
    action: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        label: PropTypes.string
      })
    )
  }).isRequired,
  changeHandle: PropTypes.func.isRequired,
  actionHandler: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  login: PropTypes.bool,
  register: PropTypes.bool
};
