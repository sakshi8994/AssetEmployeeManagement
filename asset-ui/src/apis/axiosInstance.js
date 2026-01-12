import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", 
//   withCredentials: true,
 headers: {
    "Content-Type": "application/json"
  }
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        error.response?.data ||
        "Something went wrong",
    };

    return Promise.reject(customError);
  }
);

axiosInstance.interceptors.request.use((config)=>{
const token = localStorage.getItem("token");

if(token){
    config.headers.Authorization=`Bearer ${token}`;
}

return config;

})

export default axiosInstance;
