import React from "react";
import { main, active, mark } from "./GenreItem.module.scss";
import PropTypes from "prop-types";

export const GenreItem = props => {
	const { genre, index, onClick } = props;
	const styles = selected => {
		return selected ? [main, active].join(" ") : main;
	};
	console.log(styles());
	const delay = index => {
		return {
			animationDelay: `${index * 300}ms`,
		};
	};
	return (
		<div
			className={styles(genre.isSelected)}
			style={delay(index)}
			onClick={() => onClick()}
		>
			<img src={genre.url} alt="icon" />
			<h3>{genre.name}</h3>
			{genre.isSelected ? (
				<div className={mark}>
					<i className="material-icons">check</i>
				</div>
			) : null}
		</div>
	);
};

GenreItem.propTypes = {
	genre: PropTypes.object,
};
