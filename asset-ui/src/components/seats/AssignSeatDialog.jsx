import { Dialog, DialogActions, DialogContent, DialogTitle ,Button ,TextField ,Typography, Divider} from '@mui/material'
import React from 'react'
 import Autocomplete from "@mui/material/Autocomplete";
 import SeatGrid from "../seats/SeatGrid";


function AssignSeatDialog({openAssignSeat,setOpenAssignSeat,employeeList,selectedEmployee,setSelectedEmployee  ,handleAssignSeat ,errorMsg}) {
  return (
   <Dialog open={openAssignSeat} onClose={()=>setOpenAssignSeat(false)}>

   

    <DialogTitle> Assign Seat </DialogTitle>
<DialogContent>

    <Autocomplete
    options={employeeList}
    getOptionLabel={(option)=>
        `${option.employeeId} -${option.name} (${option.department})`
    }
    value={selectedEmployee}
    onChange={(e,newValue)=>setSelectedEmployee(newValue)}
    renderInput={(params)=>(
        <TextField
        {...params}
        label="Employee"
        placeholder="Search Employee"
        fullWidth
        />
    )}
     sx={{mt:2}}
    />


    {/* <Divider sx={{ my: 2 }} />
  <Typography variant="subtitle1">
    Select Seat
  </Typography> */}

  
  {/* <SeatGrid
    seats={seats}                 
    onSeatClick={(seat) => setSelectedSeat(seat)}
  /> */}
    
    {errorMsg && (
    
    <Typography color="error" mt={1}>
        {errorMsg}
    </Typography>
    
    )}

</DialogContent>

<DialogActions>
<Button onClick={()=>setOpenAssignSeat(false)}>Cancel</Button>

<Button 

variant="contained"
onClick={handleAssignSeat}

// disabled={selectedSeat !== "Free"}

>
Assign
</Button>

</DialogActions>

   </Dialog>

   
  )
}

export default AssignSeatDialog