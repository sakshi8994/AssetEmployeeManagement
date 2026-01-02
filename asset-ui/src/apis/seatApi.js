import api from "./axiosConfig";

export const addSeat = (data) =>
  api.post("/seats",data);


export const searchSeats = (params) =>
  api.get("/seats/search",{params});

export const getAllSeats = () =>
  api.get("/seats");


export const getSeatById = (id) =>
  api.get(`/seats/${id}`);

export const updateSeat=(id,data)=>
    api.put(`/seats/${id}`,data);

export const deleteSeat=(id)=>
    api.delete(`/seats/${id}`);

export const assignSeat =(seatId , employeeId)=> 
    api.post(`/seats/${seatId}/assign`,null ,{
     
      params:{employeeId}

    })

export const releaseSeat =(seatId)=>
  api.post(`/seats/${seatId}/release`)

export const  getSeatByStatus=(status)=>
  api.get(`/seats/status/${status}`)

export const addFloor=(params)=>
  api.post("/seats/floor",null,{params});


