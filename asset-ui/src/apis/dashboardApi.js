import axios from "../apis/axiosInstance";

export const getDashboardSummary = () => {
  return axios.get("/api/dashboard/summary");
};
