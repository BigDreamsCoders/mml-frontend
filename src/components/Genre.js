import React from "react";

const Genre = ({ name }) => {
	return (
		<div
			className="card bg-light border-light mb-3"
			style={{ margin: "1em" }}
		>
			<div className="row no-gutters">
				<div className="card-body">
					<h1>{name}</h1>
				</div>
			</div>
		</div>
	);
};

export default Genre;
