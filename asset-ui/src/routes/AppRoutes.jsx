import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
import AssetPage from "../pages/AssetPage";
import EmployeePage from "../pages/EmployeePage";
// import SeatsPage from "../pages/SeatsPage";
import HistoryPage from "../pages/HistoryPage";
import SeatManagement from "../pages/seats/SeatManagement";
// import AssetDetails from "../pages/AssetDetails";

import Dashboard from "../pages/dashboard/DashBoard";
import Login from "../pages/auth/Login";
import SignupPage from "../pages/auth/SignupPage";
import CategoryList from "../components/categories/CategoryList";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Unauthorized from "../components/common/Unauthorized";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>


       <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route path="/assets" 
        element={
          <ProtectedRoute> 
             <AssetPage />
             </ProtectedRoute>
       
        
        } />


         <Route path="/dashboard" element={
          <ProtectedRoute> 
          <Dashboard />
           </ProtectedRoute>
          } />


        <Route path="/employees" element={
          <ProtectedRoute> 
          <EmployeePage />
           </ProtectedRoute>
          } />

         
          <Route path="/category" element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
            <CategoryList/>
              </RoleRoute>
            }/>



        

            <Route
        path="/history"
        element={
          <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
            <HistoryPage />
          </RoleRoute>
        }
      />


        <Route path="/seats" element={
          
          <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
          <SeatManagement/>

          </RoleRoute>
          
          } />
        
       
          
           
          
          

      </Routes>
    </BrowserRouter>
  );
}
