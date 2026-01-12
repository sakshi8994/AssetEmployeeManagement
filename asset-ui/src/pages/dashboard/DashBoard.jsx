import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper,Button ,Stack } from "@mui/material";
import StatCard from "./StatCard";
import AssetStatusChart from "./AssetStatusChart";
import SeatOccupancyChart from "./SeatOccupancyChart";
import { getDashboardSummary } from "../../apis/dashboardApi";
import { useSnackbar } from "../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

export default function Dashboard() {

    const { showSnackbar } = useSnackbar();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    
    try{
       const res = await getDashboardSummary();
        setData(res.data);
    }catch(err){
          showSnackbar(err.message,"error")
    }
  };

  if (!data) return null;

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Dashboard
      </Typography>
   <Stack direction="row" spacing={2} mb={3}>
   <Button varient="contained" onClick={()=>navigate("/employees")}>Employee</Button>
   <Button  varient="contained" onClick={()=>navigate("/assets")}>Assets</Button>

   {isAdmin() && (

      <>
      <Button  varient="contained" color="secondary" onClick={()=>navigate("/seats")}>Seats</Button>
   <Button varient="contained" color="secondary" onClick={()=>navigate("/history")}>History</Button>
      </>

   )}
   
  
   </Stack>
      
      <Grid container spacing={2} mb={4}>
        <Grid item><StatCard title="Total Assets" value={data.totalAssets} /></Grid>
        <Grid item><StatCard title="Assigned Assets" value={data.assignedAssets} color="success.main" /></Grid>
        <Grid item><StatCard title="Available Assets" value={data.availableAssets} color="info.main" /></Grid>
        <Grid item><StatCard title="Assets Under Repair" value={data.repairAssets} color="warning.main" /></Grid>

        <Grid item><StatCard title="Total Seats" value={data.totalSeats} /></Grid>
        <Grid item><StatCard title="Occupied Seats" value={data.occupiedSeats} color="error.main" /></Grid>
        <Grid item><StatCard title="Free Seats" value={data.freeSeats} color="success.main" /></Grid>
      </Grid>

      {/* 🔹 CHARTS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" mb={1}>
              Asset Status Distribution
            </Typography>
            <AssetStatusChart data={data} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" mb={1}>
              Seat Occupancy
            </Typography>
            <SeatOccupancyChart data={data} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
