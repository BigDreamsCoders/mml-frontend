import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { inactiveTab, activeTab, tabs } from "./Dashboard.module.scss";
import SongList from "../SongList.js";
export const Dashboard = (props) => {
	const {list} = props;
	return (
		<>
			<Tabs selectedTabClassName={activeTab}>
				<TabList className={tabs}>
					<Tab disabledClassName={inactiveTab}>Fav Songs</Tab>
					<Tab>Fav Artist</Tab>
					<Tab>Fav Genres</Tab>
				</TabList>
				<TabPanel>
					Fav Songs
					<SongList favorite={false} list={list}/>
				</TabPanel>
				<TabPanel>Fav Artist</TabPanel>
				<TabPanel>Fav Genres</TabPanel>
			</Tabs>
		</>
	);
};
