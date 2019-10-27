import axios from "axios";

export const auth = axios.create({
  baseURL: "https://mml-api.herokuapp.com/api/v1/user/"
});