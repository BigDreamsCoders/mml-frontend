import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
	main,
	info,
	infoSm,
	avatar,
	dashboard,
	status,
	button,
} from "./Profile.module.scss";
import { Dashboard } from "../../components/Dashboard/Dashboard";

export const Profile = () => {
	return (
		<MainLayout title="Profile">
			<main className={main}>
				<div className={info}>
					<div className={avatar}>
						<img
							src="https://avatars1.githubusercontent.com/u/31825365?s=460&v=4"
							alt="avatar"
						/>
						<div className={status}>
							<h3>Pedro Gómez</h3>
						</div>
					</div>
					<button className={`${button} btn btn-primary`}>
						Edit profile
					</button>
					<div className={infoSm}>
						<h3>Pedro Gomez</h3>
					</div>
				</div>
				<div className={dashboard}>
					<Dashboard />
				</div>
			</main>
		</MainLayout>
	);
};
