import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { Helmet } from "react-helmet";
import { footer, navbar } from "./MainLayout.module.scss";
import PropTypes from "prop-types";

export const MainLayout = props => {
	const { title } = props;
	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Navbar expand="md" className={navbar}>
				<NavbarBrand href="/">MML</NavbarBrand>
			</Navbar>
			{props.children}
			<footer className={footer}>
				&copy; {new Date().getFullYear()} Copyright
				{/* <Link to="/">www.mml.com</Link> */}
			</footer>
		</>
	);
};

MainLayout.propTypes = {
	title: PropTypes.string.isRequired,
};
