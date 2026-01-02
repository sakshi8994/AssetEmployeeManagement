
import React from 'react'
import { Stack, TextField , MenuItem} from '@mui/material'

function SeatFilters({seatId , setSeatId,status,setStatus,floor,setFloor, colNum,setColNum,rowNum,setRowNum}) {
  return (
    <>
   <Stack direction="row" spacing={2} mb={2}>
   
  <TextField
       label="Seat Id"
       size="small"
       value={seatId}
       onChange={(e)=>setSeatId(e.target.value)}
       />

     <TextField
        select
        label="Status"
        size="small"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: 150 }}
      >
          <MenuItem value="">All</MenuItem>
    <MenuItem value="Free">Free</MenuItem>
    <MenuItem value="Occupied">Occupied</MenuItem>
       </TextField>

       <TextField
       label="Floor"
       size="small"
       value={floor}
       onChange={(e)=>setFloor(e.target.value)}
       />

        <TextField
       label="Column"
       size="small"
       value={colNum}
       onChange={(e)=>setColNum(e.target.value)}
       />

        <TextField
       label="Row"
       size="small"
       value={rowNum}
       onChange={(e)=>setRowNum(e.target.value)}
       />

   </Stack>
   </>
  )
}

export default SeatFilters