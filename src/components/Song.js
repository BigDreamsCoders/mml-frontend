import React from "react";
import { Constants } from "../utils/Constants";
import { withToken } from "../axios/instance/auth";

const initState = {
	isFetching: false,
	isSkipping: true,
	networkError: false,
	hasError: false,
};

class Song extends React.Component{

	constructor(props) {
		super(props);
		this.state = { ...initState };
	}

	async handleFavorite(e){
		e.preventDefault();
		const {code} = this.props;
		const {favorite} = this.props;
		var status = 0;
		if (favorite){
			status = 1;
		}
		try {
			this.setState({
				isFetching: true,
			});
			const { data } = await withToken.post("/api/v1/rating/song/like", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
				code,
				status,
			});
			console.log(data);
			this.setState({
				isFetching: false
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
		}
	}

	render(){
		const {favorite} = this.props;
		var message = "Quitar de favoritos";
		if (favorite){
				message = "Agregar a favoritos";
		}
		return(
			<div className="card bg-light border-light mb-3">
				<div className="row no-gutters">
					<div className="col-md-2">
						<img src={this.props.thumbNail} className="card-img" alt=""></img>
					</div>
					<div className="col-md-10">
						<div className="card-body">
							<h2 className="card-title">{this.props.title}</h2>
							<p className="card-subtitle text-muted">
								{this.props.musicians.name}
							</p>
							<p className="card-subtitle text-muted">
								Rating: {this.props.rating}
							</p>
							<a href={this.props.youtubeLink}>
								<p>Youtube link</p>
							</a>
							<button onClick={e => {this.handleFavorite(e);}}>{message}</button>
							<button onClick={e => {this.props.viewSong(this.props);}}>Mas informacion</button>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

export default Song;
