
import axiosInstance from "../apis/axiosInstance";


export const searchEmployee = (params) =>{
  
  return axiosInstance.get("/api/employee/search", { params });
}

export const addEmployee = (data) =>
{ 
  return axiosInstance.post("/api/employee", data);}

export const getAllEmployee = () =>
  axiosInstance.get("/api/employee");

export const getEmployeeById = (id) =>
  axiosInstance.get(`/api/employee/${id}`);


export const updateEmployee = (id,data) =>
  axiosInstance.put(`/api/employee/${id}`,data);

export const deleteEmployee = (id) =>
  axiosInstance.delete(`/api/employee/${id}`);


