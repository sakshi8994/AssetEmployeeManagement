import api from "./axiosConfig";
import axiosInstance from "../apis/axiosInstance";

export const searchCategory=(params)=>{
   return axiosInstance.get(`/api/category/search`,{params});}

export const getAllCategory = () =>
  axiosInstance.get("/api/category/all");

export const addCategory = (data) =>
  axiosInstance.post("/api/category",data);

export const getCategoryByName = (data) =>
  axiosInstance.get("/api/category",data);

export const getCategoryById=(id)=>
    axiosInstance.get(`/api/category/${id}`);

export const deleteCategory=(id)=>
   axiosInstance.delete(`/api/category/${id}`);

export const updateCategory=(id,data)=>
    axiosInstance.put(`/api/category/${id}`,data);