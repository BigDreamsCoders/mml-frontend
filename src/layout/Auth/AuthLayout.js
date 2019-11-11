import React from "react";
import { Helmet } from "react-helmet";
import { Alert } from "reactstrap";
import { main, formContainer } from "./Auth.module.scss";
import PropTypes from "prop-types";

export const AuthWrapper = props => {
	const { error, onDismiss, children, title } = props;
	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className={`${main} Fade`}>
				<div className={formContainer}>
					<Alert
						color="danger"
						isOpen={error.hasError}
						toggle={onDismiss}
					>
						{error.msg}
					</Alert>
					{children}
				</div>
			</main>
		</>
	);
};

AuthWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	error: PropTypes.object,
	errorMsg: PropTypes.string,
	onDismiss: PropTypes.func,
};
