import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value, color }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

// src/pages/dashboard/
//  ├── Dashboard.jsx
//  ├── StatCard.jsx
//  ├── AssetStatusChart.jsx
//  ├── SeatOccupancyChart.jsx
//  └── dashboardApi.js