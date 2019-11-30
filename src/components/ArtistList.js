import React from "react";
import Artist from "./Artist.js";
import { container } from "./SongList.module.scss";

const ArtistList = props => {
	return (
		<div className={container}>
			{props.list.map((item, i) => (
				<Artist key={i} {...item} />
			))}
		</div>
	);
};

export default ArtistList;
