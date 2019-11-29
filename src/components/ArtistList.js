import React from "react";
import Artist from "./Artist.js";

const ArtistList = (props) => {
	return (
		<div>
			{props.list.map((item, i) => (
				<Artist key={i} {...item} />
			))}
		</div>
	);
}

export default ArtistList;
