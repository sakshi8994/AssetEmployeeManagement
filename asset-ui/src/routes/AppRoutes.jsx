import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
import AssetPage from "../pages/AssetPage";
import EmployeePage from "../pages/EmployeePage";
// import SeatsPage from "../pages/SeatsPage";
import HistoryPage from "../pages/HistoryPage";
import SeatManagement from "../pages/seats/SeatManagement";
// import AssetDetails from "../pages/AssetDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/assets" element={<AssetPage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/seats" element={<SeatManagement/>} />
         <Route path="/history" element={<HistoryPage />} />
         {/* <Route path="/assets/:id" element={<AssetDetails />} /> */}
4
      </Routes>
    </BrowserRouter>
  );
}
