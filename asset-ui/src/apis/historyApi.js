import api from "./axiosConfig";
import axiosInstance from "../apis/axiosInstance";

export const searchHistory = (params) =>
  axiosInstance.get("/api/history/search", { params });

export const getHistoryByAsset = (id) =>
  axiosInstance.get(`/api/history/assset/${id}`);

export const getHistoryByemployee = (id) =>
  axiosInstance.get(`/api/history/employee/${id}`);

export const getAllHistory =()=>
    axiosInstance.get(`/api/history`);
