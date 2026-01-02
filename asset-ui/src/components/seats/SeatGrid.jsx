import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

function SeatGrid({ seats, onSeatClick ,selectedSeat}) {

  const floors = seats.reduce((acc, seat) => {
    acc[seat.floor] = acc[seat.floor] || {};
    acc[seat.floor][seat.rowNum] =
      acc[seat.floor][seat.rowNum] || [];
    acc[seat.floor][seat.rowNum].push(seat);
    return acc;
  }, {});

  const getMaxColumns = (floorSeats) => {
    let max = 0;
    Object.values(floorSeats).forEach(rowSeats => {
      max = Math.max(max, rowSeats.length);
    });
    return max;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 1000, width: "100%" }}>
        {Object.keys(floors).map((floor) => {
          const maxCols = getMaxColumns(floors[floor]);

          return (
            <Box key={floor} mb={5}>
              <Typography
                variant="h6"
                mb={2}
                textAlign="center"
              >
                Floor {floor}
              </Typography>

              {Object.keys(floors[floor]).map((row) => (
                <Box
                  key={row}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${maxCols}, 60px)`,
                    gap: 2,
                    justifyContent: "center",
                    mb: 1,
                   


                  }}
                >
                  {floors[floor][row].map((seat) => {
                    const seatInfo = (
                      <Box>
                        <Typography variant="caption">
                          Seat ID: {seat.seatId}
                        </Typography><br />
                        <Typography variant="caption">
                          Row {seat.rowNum}, Col {seat.colNum}
                        </Typography><br />
                        <Typography variant="caption">
                          Status: {seat.status}
                        </Typography>
                      </Box>
                    );

                    return (
                      <Tooltip key={seat.seatId} title={seatInfo} arrow>
                        <Box
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
                            border:
                               selectedSeat?.seatId === seat.seatId
                                  ? "3px solid #1976d2"
                                  : "2px solid transparent",
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
                      </Tooltip>
                    );
                  })}
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default SeatGrid;
