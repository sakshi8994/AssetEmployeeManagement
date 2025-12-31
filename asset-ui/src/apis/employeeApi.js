import api from "./axiosConfig";

export const searchEmployee = (params) =>
  api.get("/employee/search", { params });

export const addEmployee = (data) =>
  api.put("/employee", data);

export const getAllEmployee = () =>
  api.get("/employee");

export const getEmployeeById = (id) =>
  api.get(`/employee/${id}`);


export const updateEmployee = (id,data) =>
  api.put(`/employee/${id}`,data);

export const deleteEmployee = (id) =>
  api.delete(`/employee/${id}`);


