import React from "react";

const Song = props => (
	<div className="card bg-light border-light mb-3">
		<div className="card-header">Header</div>
		<div className="row no-gutters">
			<div className="col-md-2">
				<img src="logo512.png" className="card-img" alt=""></img>
			</div>
			<div className="col-md-10">
				<div className="card-body">
					<h2 className="card-title">{props.name}</h2>
					<h4 className="card-text text-muted">{props.artist}</h4>
					<p className="card-subtitle text-muted">{props.genre}</p>
				</div>
			</div>
		</div>
	</div>
);

export default Song;
