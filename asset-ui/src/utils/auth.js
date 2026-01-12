export const getRole = () => {
  return localStorage.getItem("role");
};

export const getToken =()=>localStorage.getItem("token");

export const isAuthenticated = ()=> !!getToken();



export const isAdmin = () => getRole() === "ROLE_ADMIN";
export const isUser = () => getRole() === "ROLE_USER";
