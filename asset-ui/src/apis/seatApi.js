import api from "./axiosConfig";
import axiosInstance from "../apis/axiosInstance";

export const addSeat = (data) =>
  axiosInstance.post("/api/seats",data);


export const searchSeats = (params) =>
 axiosInstance.get("/api/seats/search",{params});

export const getAllSeats = () =>
  axiosInstance.get("/api/seats");


export const getSeatById = (id) =>
  axiosInstance.get(`/api/seats/${id}`);

export const updateSeat=(id,data)=>
    axiosInstance.put(`/api/seats/${id}`,data);

export const deleteSeat=(id)=>
    axiosInstance.delete(`/api/seats/${id}`);

export const assignSeat =(seatId , employeeId)=> 
    axiosInstance.post(`/api/seats/${seatId}/assign`,null ,{
     
      params:{employeeId}

    })

export const releaseSeat =(seatId)=>
  axiosInstance.post(`/api/seats/${seatId}/release`)

export const  getSeatByStatus=(status)=>
  axiosInstance.get(`/api/seats/status/${status}`)

export const addFloor=(params)=>
  axiosInstance.post("/api/seats/floor",null,{params});


