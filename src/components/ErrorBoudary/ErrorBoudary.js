import React from "react";

const initState = {
	hasError: false,
};

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initState };
	}

	componentDidCatch(error) {
		console.log(error);
		this.setState({
			hasError: true,
		});
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;
		if (hasError) {
			return (
				<img
					src="https://www.searchpng.com/wp-content/uploads/2019/01/Labrador-dog-PNG-715x715.png"
					alt="error"
				/>
			);
		}
		return children;
	}
}
