import { LoginAction } from "../actions/Action";
import { Constants } from "../utils/Constants";

export const LoginReducer = (state, action) => {
	switch (action.type) {
		case LoginAction.LOGIN:
			window.localStorage.setItem(Constants.TOKEN, action.payload);
			return {
				...state,
				token: action.payload,
			};
		case LoginAction.LOGOUT:
			window.localStorage.removeItem(Constants.TOKEN);
			return {
				...state,
				token: "",
			};
		default:
			return state;
	}
};
