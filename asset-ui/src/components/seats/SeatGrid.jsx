import React from "react";
import { Box, Typography, Stack } from "@mui/material";

function SeatGrid({ seats, onSeatClick }) {
 
  const floors = seats.reduce((acc, seat) => {
    acc[seat.floor] = acc[seat.floor] || {};
    acc[seat.floor][seat.rowNum] =
      acc[seat.floor][seat.rowNum] || [];
    acc[seat.floor][seat.rowNum].push(seat);
    return acc;
  }, {});

  return (
    <Box>
      {Object.keys(floors).map((floor) => (
        <Box key={floor} mb={3}>
          
          <Typography variant="h6" mb={1}>
            Floor {floor}
          </Typography>

       
          {Object.keys(floors[floor]).map((row) => (
            <Stack
              key={row}
              direction="row"
              spacing={1}
              mb={1}
            >
              {floors[floor][row].map((seat) => (
                <Box
                  key={seat.seatId}
                  onClick={() =>
                    seat.status === "Free" &&
                    onSeatClick?.(seat)
                  }
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor:
                      seat.status === "Free"
                        ? "success.light"
                        : "error.light",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      seat.status === "Free"
                        ? "pointer"
                        : "not-allowed",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  R{seat.rowNum}C{seat.colNum}
                </Box>
              ))}
            </Stack>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default SeatGrid;
