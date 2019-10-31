import React from "react";
import PropTypes from "prop-types";

export const GenreList = props => {
  const { list } = props;
  return (
    <>
      {list.map((element, index) => (
        <p>{element.name}</p>
      ))}
    </>
  );
};

GenreList.propTypes = {
  list: PropTypes.array.isRequired
};
