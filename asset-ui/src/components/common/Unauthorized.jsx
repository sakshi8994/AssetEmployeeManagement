import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="error">
        Access Denied
      </Typography>

      <Typography sx={{ mt: 2 }}>
        You do not have permission to access this page.
      </Typography>

      <Button sx={{ mt: 3 }} onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
