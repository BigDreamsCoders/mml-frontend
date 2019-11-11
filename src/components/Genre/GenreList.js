import React from "react";
import PropTypes from "prop-types";
import { GenreItem } from "./GenreItem";
import { container, mainContainer } from "./GenreList.module.scss";

export const GenreList = props => {
	const { list, onClick } = props;
	return (
		<div className={mainContainer}>
			<div className={container}>
				{list.map((element, index) => (
					<GenreItem
						key={element.localId}
						genre={element}
						index={index}
						onClick={() => {
							onClick(index);
						}}
					/>
				))}
			</div>
		</div>
	);
};

GenreList.propTypes = {
	list: PropTypes.array.isRequired,
};
