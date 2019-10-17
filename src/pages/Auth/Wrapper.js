import React from "react";
import style from "./Auth.module.scss";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

export const AuthWrapper = props => {
  const { error, errorMsg, onDismiss, children } = props;
  return (
    <main>
      <div className={style.floating}>
        <Alert color="danger" isOpen={error} toggle={onDismiss}>
          {errorMsg}
        </Alert>
      </div>
      <video autoPlay muted loop id="video">
        <source src="video/concert.mp4" type="video/mp4" />
      </video>
      <div className={style.formContainer}>{children}</div>
    </main>
  );
};

AuthWrapper.propTypes = {
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  onDismiss: PropTypes.func
};
