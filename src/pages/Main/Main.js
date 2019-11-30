import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";
import { withRouter } from "react-router-dom";
import { MainTabs } from "../../components/Dashboard/MainTabs.js";
import { main } from "./Main.module.scss";
import { loader } from "./../Genres/FirstTimeGenres.module.scss";
const initState = {
	songs: [],
	popularsongs: [],
	artists: [],
	genres: [],
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

	viewSong(s) {
		const { history, handleLogout } = this.props;
		history.push({ pathname: "/song", song: s });
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
			console.log(data);
			const songs = data.songs;
			/* var { data } = await withToken.get("/api/v1/song/best", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			console.log(data);
			const popularSongs = data; */
			var { data } = await withToken.get("/api/v1/musician/all", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			console.log(data);
			const artists = data;
			var { data } = await withToken.get("/api/v1/genre/all", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			console.log(data);
			const genres = data;
			this.setState({
				isFetching: false,
				songs,

				artists,
				genres,
			});
		} catch (e) {
			let response;
			console.log(e.response);
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
		const { isFetching, songs, popularSongs, artists, genres } = this.state;
		console.log(songs);
		return (
			<MainLayout title="Set up">
				<main className={main}>
					<h1>Music List</h1>
					{isFetching && (
						<div className={loader}>
							<div className="lds-facebook">
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					)}
					{!isFetching && (
						<MainTabs
							viewSong={this.viewSong}
							list={songs}
							popularSongs={popularSongs}
							artists={artists}
							genres={genres}
						/>
					)}
				</main>
			</MainLayout>
		);
	}
}

export default withRouter(Main);
