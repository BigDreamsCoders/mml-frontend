import axios from "axios";

export const auth = axios.create({
  //baseURL: "https://mml-api.herokuapp.com/api/v1/user/"
  baseURL: process.env.REACT_APP_API_URL+"/api/v1/user/"
});
