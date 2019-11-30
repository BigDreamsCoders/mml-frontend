import React from "react";
import Genre from "./Genre.js";
import { container } from "./SongList.module.scss";

const GenreList = props => {
	return (
		<div className={container}>
			{props.list.map((item, i) => (
				<Genre key={i} {...item} />
			))}
		</div>
	);
};

export default GenreList;
