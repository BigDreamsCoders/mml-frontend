import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { inactiveTab, activeTab, tabs } from "./Dashboard.module.scss";
export const Dashboard = () => {
	return (
		<>
			<Tabs selectedTabClassName={activeTab}>
				<TabList className={tabs}>
					<Tab disabledClassName={inactiveTab}>Fav Songs</Tab>
					<Tab>Fav Artist</Tab>
					<Tab>Fav Genres</Tab>
				</TabList>
				<TabPanel>Fav Songs</TabPanel>
				<TabPanel>Fav Artist</TabPanel>
				<TabPanel>Fav Genres</TabPanel>
			</Tabs>
		</>
	);
};
