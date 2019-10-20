import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

export const MainLayout = props => {
  const { title } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {props.children}
    </>
  );
};

MainLayout.propTypes = {
  title: PropTypes.string.isRequired
};
