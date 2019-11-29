import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";
import { withRouter } from "react-router-dom";
import { MainTabs } from "../../components/Dashboard/MainTabs.js";

const initState = {
	songs: [],
	popularsongs: [],
	isFetching: false,
	isSkipping: true,
	networkError: false,
	hasError: false,
};

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initState };
		this.viewSong = this.viewSong.bind(this);
	}

	viewSong(s){
		const { history, handleLogout } = this.props;
		history.push({pathname: "/song", song:s});
	}

	async componentDidMount() {
		const { history, handleLogout } = this.props;
		try {
			this.setState({
				isFetching: true,
			});
			var { data } = await withToken.get("/api/v1/song/all", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			const songs = data;
			var { data } = await withToken.get("/api/v1/song/best", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			const popularSongs = data;
			this.setState({
				isFetching: false,
				songs,
				popularSongs,
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

	render() {
		const { songs } = this.state;
		const { popularSongs } = this.state;
		return (
			<MainLayout title="Set up">
				<h1>Music List</h1>
				<MainTabs viewSong={this.viewSong} list={songs} popularSongs={popularSongs}/>
			</MainLayout>
		);
	}
}

export default withRouter(Main);
