import React from "react";
import { Helmet } from "react-helmet";
import { Alert } from "reactstrap";
import { main, floating, video, formContainer } from "./Auth.module.scss";
import PropTypes from "prop-types";

export const AuthWrapper = props => {
  const { error, errorMsg, onDismiss, children, title } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className={`${main} Fade`}>
        <div className={floating}>
          <Alert color="danger" isOpen={error} toggle={onDismiss}>
            {errorMsg}
          </Alert>
        </div>
        {/* <video autoPlay muted loop id="video" className={video}>
          <source src="video/concert.mp4" type="video/mp4" />
        </video> */}
        <div className={formContainer}>{children}</div>
      </main>
    </>
  );
};

AuthWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  onDismiss: PropTypes.func
};
