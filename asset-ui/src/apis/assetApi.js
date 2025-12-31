import api from "./axiosConfig";
import axios from "axios";

export const getAssets = (params) =>
  api.get("/assets/search", { params });

export const getAssetById = (id) =>
  api.get(`/assets/${id}`);

export const createAsset = (data) =>
  api.post("/assets", data);

export const updateAsset = (id, data) =>
  api.put(`/assets/${id}`, data);

export const deleteAsset = (id) =>
  api.delete(`/assets/${id}`);

export const assignAsset = (id, employeeId) =>
  api.post(`/assets/${id}/assign`, null, {
    params: { employeeId }
  });

export const revokeAsset = (assetId) =>
  api.post(`/assets/${assetId}/revoke`);