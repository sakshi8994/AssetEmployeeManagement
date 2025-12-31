import api from "./axiosConfig";


export const searchHistory = (params) =>
  api.get("/history/search", { params });

export const getHistoryByAsset = (id) =>
  api.get(`history/assset/${id}`);

export const getHistoryByemployee = (id) =>
  api.get(`history/employee/${id}`);

export const getAllHistory =()=>
    api.get(`/history`);
