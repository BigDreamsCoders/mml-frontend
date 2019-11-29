import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { inactiveTab, activeTab, tabs } from "./Dashboard.module.scss";
import SongList from "../SongList.js";

export const MainTabs = (props) => {
	const {list, popularSongs} = props;
	return (
		<>
			<Tabs selectedTabClassName={activeTab}>
				<TabList>
					<Tab disabledClassName={inactiveTab}>Songs</Tab>
					<Tab>Most Popular</Tab>
				</TabList>
				<TabPanel>
					<p>Songs</p>
					<SongList favorite={true} list={list}/>
				</TabPanel>
				<TabPanel>
					<p>Most Popular</p>
					<SongList favorite={true} list={popularSongs}/>
				</TabPanel>
			</Tabs>
		</>
	);
};
