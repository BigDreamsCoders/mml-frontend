import React from "react";
import Genre from "./Genre.js";

const GenreList = props => {
	return (
		<div>
			{props.list.map((item, i) => (
				<Genre key={i} {...item} />
			))}
		</div>
	);
};

export default GenreList;
