import axios from "../apis/axiosInstance";

export const login = (payload) =>
  axios.post("/api/auth/login", payload);


export const signup = (payload) =>
  axios.post("/api/auth/signup", payload);