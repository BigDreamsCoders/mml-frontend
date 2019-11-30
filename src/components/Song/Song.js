import React from "react";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";
import { fav, container } from "./Song.module.scss";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

const initState = {
	isFetching: false,
	isSkipping: true,
	networkError: false,
	hasError: false,
	song: {},
    favorite:false
};

class Song extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initState, song: this.props, favorite:this.props.favorite };
		console.log(this.props);
	}

	async handleFavorite(e) {
		e.preventDefault();
		const { code } = this.state.song;
        const {favorite} = this.state;
		var status = 0;
		if (favorite) {
			status = 1;
		}
		try {
			this.setState({
				isFetching: true,
			});
			await withToken.post("/api/v1/rating/song/like", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
				code,
				status,
			});
			const { data } = await withToken.get(`/api/v1/song/${code}`);
			this.setState({
				isFetching: false,
				song: data.element,
			});
		} catch ({ response }) {
			console.log(response);
			try {
				const responseStatus = response.status;
			} catch (e) {
				this.setState({
					isFetching: false,
					hasError: true,
				});
			}
		}
	}

	async handleRate({ rating }) {
		const { code } = this.state.song;
		try {
			const { data } = await withToken.post("/api/v1/rating/song", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
				code: code,
				value: rating,
			});
			const response = await withToken.get(`/api/v1/song/${code}`);
			this.setState({
				isFetching: false,
				song: response.data.element,
			});
		} catch ({ request }) {
			console.log(request);
		}
	}

	render() {
		const {
			rating,
			musicians,
			thumbNail,
			title,
		} = this.state.song;
        const {favorite}=this.state;
		var message = "favorite_border";
		if (favorite) {
			message = "favorite";
		}
		return (
			<div
				className="card bg-light border-light mb-3"
				style={{ margin: "1em" }}
			>
				<div className={container}>
					<div
						className="col-md-10"
					>
						<img src={thumbNail} className="card-img" alt=""></img>
					</div>
					<div className="col-md-10">
						<div className="card-body">
							<h2 className="card-title">{title}</h2>
							<p className="card-subtitle text-muted">
								{this.props.album[0].musician.name}
							</p>
							<div>
								<Rater
									total={5}
									rating={rating}
									onRate={e => {
										this.handleRate(e);
									}}
								/>
							</div>
							<i
								className={`material-icons ${fav}`}
								onClick={e => {
									this.handleFavorite(e);
								}}
							>
								{message}
							</i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Song;
