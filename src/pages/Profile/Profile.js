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
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";

const initState = {
	songs: [],
	isFetching: false,
	isSkipping: true,
	networkError: false,
	hasError: false,
};

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = { ...initState };
	}

	logout(e){
			e.preventDefault();
			const {handleLogout, history} = this.props;
			handleLogout();
			history.push("/login");
	}

	async componentDidMount() {
		const { history, handleLogout } = this.props;
		try {
			this.setState({
				isFetching: true,
			});
			const { data } = await withToken.get("/api/v1/rating/favorites", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			const songs = data.element;
			console.log(data.message+" "+songs);
			this.setState({
				isFetching: false,
				songs,
			});
		} catch (e) {
			let response;
			try {
				response = e.response;
				response = response.status;
			} catch (e) {
				this.setState({
					isFetching: false,
					hasError: true,
				});
				return;
			}
			switch (response) {
				case 403:
					handleLogout();
					history.push("/login");
					break;
				default:
					this.setState({
						isFetching: false,
						networkError: true,
					});
					break;
			}
		}
	}

	render(){
		const {songs} = this.state;

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
						<Dashboard list={songs}/>
					</div>
				</main>
			</MainLayout>
		);
	}
};

export default withRouter(Profile);
