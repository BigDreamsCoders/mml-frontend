import React from "react";
import Song from "./Song/Song";
import { container } from "./SongList.module.scss";

const SongList = props => {
	return (
		<div className={container}>
			{props.list.map((item, i) => (
				<Song
					viewSong={props.viewSong}
					favorite={props.favorite}
					key={i}
					{...item}
				/>
			))}
		</div>
	);
};

export default SongList;
