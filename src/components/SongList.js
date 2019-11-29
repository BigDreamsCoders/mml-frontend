import React from "react";
import Song from "./Song.js";

const SongList = (props) => {
	return (
		<div>
			{props.list.map((item, i) => (
				<Song viewSong={props.viewSong} favorite={props.favorite} key={i} {...item} />
			))}
		</div>
	);
}

export default SongList;
