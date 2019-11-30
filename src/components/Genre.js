import React from "react";

class Genre extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card bg-light border-light mb-3">
				<div className="row no-gutters">
					<div className="card-body">
						<h1>{this.props.name}</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Genre;
