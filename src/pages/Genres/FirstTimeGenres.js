import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { GenreList } from "../../components/Genre/GenreList.js";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";
import { fab, main, loader } from "./FirstTimeGenres.module.scss";
import { withRouter } from "react-router-dom";

const initState = {
	genres: [],
	isFetching: false,
	isSkipping: false,
	networkError: false,
	hasError: false,
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

	handleCardClick(index) {
		const genres = this.state.genres.slice();
		genres[index].isSelected = !genres[index].isSelected;
		const skip = genres.filter(element => {
			return element.isSelected;
		}).length;
		console.log(skip >= 3);
		this.setState({
			genres,
			isSkipping: skip >= 3,
		});
	}

	handleContinue() {
		const { history } = this.props;
		history.push("/me");
	}

	render() {
		const { genres, isFetching, networkError, hasError } = this.state;
		const page = () => {
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
			} else if (networkError) {
				return (
					<img
						src="https://cdn3.iconfinder.com/data/icons/wifi-2/460/connection-error-512.png"
						alt="error icon"
					/>
				);
			} else {
				return (
					<>
						<GenreList
							list={genres}
							onClick={index => {
								this.handleCardClick(index);
							}}
						/>
						<button
							className={`${fab} btn`}
							onClick={() => {
								this.handleContinue();
							}}
						>
							{this.state.isSkipping ? "Continue" : "Skip"}
							<i className="material-icons">
								keyboard_arrow_right
							</i>
						</button>
					</>
				);
			}
		};
		return (
			<>
				{hasError ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							minWidth: "100vw",
							minHeight: "100vh",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<h2>Hubo un error, aqui tienes un perro</h2>
						<img
							src="https://www.searchpng.com/wp-content/uploads/2019/01/Labrador-dog-PNG-715x715.png"
							alt="error"
							style={{ width: "40%", height: "40%" }}
						/>
					</div>
				) : (
					<MainLayout title="Set up">
						<main className={main}>
							<h3>Selecciona almenos 3 categorías</h3>
							<p>
								Puedes saltarte este paso, pero no te podremos
								hacer sugerencias personalizadas
							</p>
							{page()}
						</main>
					</MainLayout>
				)}
			</>
		);
	}
}

export default withRouter(FirstTimeGenres);
