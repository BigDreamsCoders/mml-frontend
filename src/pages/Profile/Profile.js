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
import { withRouter } from "react-router-dom";

class Profile extends React.Component {

	constructor(props) {
		super(props);
	}

	logout(e){
			e.preventDefault();
			const {handleLogout, history} = this.props;
			handleLogout();
			history.push("/login");
	}

	render(){
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
							<div>
								<button onClick={e => {this.logout(e);}}>Logout</button>
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
	}
};

export default withRouter(Profile);
