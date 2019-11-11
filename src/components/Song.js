import React from "react";

const Song = props => (
	<div className="card bg-light border-light mb-3">
		<div className="row no-gutters">
			<div className="col-md-2">
				<img src={props.thumbNail} className="card-img" alt=""></img>
			</div>
			<div className="col-md-10">
				<div className="card-body">
					<h2 className="card-title">{props.title}</h2>
					<h4 className="card-text text-muted">
						{props.description}
					</h4>
					<p className="card-subtitle text-muted">
						Genre: {props.genre.name}
					</p>
					<p className="card-subtitle text-muted">
						Length: {props.length}
					</p>
					<p className="card-subtitle text-muted">
						Rating: {props.rating}
					</p>
					<a href={props.youtubeLink}>
						<p>Youtube link</p>
					</a>
				</div>
			</div>
		</div>
	</div>
);

export default Song;
