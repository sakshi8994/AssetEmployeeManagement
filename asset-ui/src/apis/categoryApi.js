import api from "./axiosConfig";
export const getAllCategory = () =>
  api.get("/category/all");

export const addCategory = (data) =>
  api.post("/category/all",data);

export const getCategoryByName = (data) =>
  api.get("/category/all",data);

export const getCategoryById=(id)=>
    api.get(`category/${id}`);

export const deleteCategory=(id)=>
    api.delete(`category/${id}`);

export const updateCategory=(id,data)=>
    api.put(`category/${id}`,data);