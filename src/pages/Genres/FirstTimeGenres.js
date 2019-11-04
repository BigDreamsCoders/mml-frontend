import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { GenreList } from "../../components/Genre/GenreList.js";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";
import { main, loader } from "./FirstTimeGenres.module.scss";
import { withRouter } from "react-router-dom";

const initState = {
	genres: [],
	isFetching: false,
};

class FirstTimeGenres extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initState };
		this.handleCardClick = this.handleCardClick.bind(this);
	}

	async componentDidMount() {
		const { history, handleLogout } = this.props;
		try {
			this.setState({
				isFetching: true,
			});
			const { data } = await withToken.get("/api/v1/genre/all", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			const genres = data.map(genre => ({
				...genre,
				isSelected: false,
			}));
			this.setState({
				isFetching: false,
				genres,
			});
		} catch ({ response }) {
			switch (response.status) {
				case 403:
					handleLogout();
					history.push("/login");
					break;
				default:
					break;
			}
		}
	}

	handleCardClick(index) {
		const genres = this.state.genres.slice();
		genres[index].isSelected = !genres[index].isSelected;
		this.setState({
			genres,
		});
	}

	render() {
		const { genres, isFetching } = this.state;
		const content = () => {
			if (isFetching) {
				return (
					<div className={loader}>
						<div className="lds-facebook">
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				);
			} else {
				return (
					<GenreList
						list={genres}
						onClick={index => {
							this.handleCardClick(index);
						}}
					/>
				);
			}
		};

		return (
			<MainLayout title="Set up">
				<main className={main}>{content()}</main>
			</MainLayout>
		);
	}
}

export default withRouter(FirstTimeGenres);
