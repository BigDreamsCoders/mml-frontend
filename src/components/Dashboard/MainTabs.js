import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { inactiveTab, activeTab, tabs } from "./Dashboard.module.scss";
import SongList from "../SongList.js";
import ArtistList from "../ArtistList.js";
import GenreList from "../GenreList.js";

export const MainTabs = props => {
	const { list, popularSongs, artists, genres } = props;
	return (
		<>
			<Tabs selectedTabClassName={activeTab}>
				<TabList>
					<Tab disabledClassName={inactiveTab}>Songs</Tab>
					<Tab>Most Popular</Tab>
					<Tab>Artists</Tab>
					<Tab>Genres</Tab>
				</TabList>
				<TabPanel>
					<SongList
						viewSong={props.viewSong}
						favorite={true}
						list={list}
					/>
				</TabPanel>
				<TabPanel>
					<p>Most Popular</p>
					{/* <SongList
						viewSong={props.viewSong}
						favorite={true}
						list={popularSongs}
					/> */}
				</TabPanel>
				<TabPanel>
					<p>Artists</p>
					<ArtistList list={artists} />
				</TabPanel>
				<TabPanel>
					<p>Genres</p>
					<GenreList list={genres} />
				</TabPanel>
			</Tabs>
		</>
	);
};
