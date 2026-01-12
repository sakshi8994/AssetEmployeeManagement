import api from "./axiosConfig";
import axios from "axios";
import axiosInstance from "../apis/axiosInstance";

export const getAssets = (params) =>
  axiosInstance.get("/api/assets/search", { params });

export const getAssetById = (id) =>
  axiosInstance.get(`/api/assets/${id}`);

export const createAsset = (data) =>
  axiosInstance.post("/api/assets", data);

export const updateAsset = (id, data) =>
  axiosInstance.put(`/api/assets/${id}`, data);

export const deleteAsset = (id) =>
  axiosInstance.delete(`/api/assets/${id}`);

export const assignAsset = (id, employeeId) =>
  axiosInstance.post(`/api/assets/${id}/assign`, null, {
    params: { employeeId }
  });

export const revokeAsset = (assetId) =>
  axiosInstance.post(`/api/assets/${assetId}/revoke`);