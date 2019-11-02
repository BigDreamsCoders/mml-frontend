import axios from "axios";
import { Constants } from "../../utils/Constants";

export const auth = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL ||
		"http://localhost:8080"}/api/v1/user/`,
});

export const withToken = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL || "localhost:8080"}`,
	headers: {
		Authorization: localStorage.getItem(Constants.TOKEN),
	},
});
