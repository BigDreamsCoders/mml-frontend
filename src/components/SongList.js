import React from "react";
import Song from "./Song.js";

const SongList = props => (
	<div>
		{props.list.map((item, i) => (
			<Song key={i} {...item} />
		))}
	</div>
);

export default SongList;
