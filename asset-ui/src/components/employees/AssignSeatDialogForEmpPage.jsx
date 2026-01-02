
import { Dialog ,Button,DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect ,useState } from 'react'
import SeatGrid from '../seats/SeatGrid'
import { assignSeat, getSeatByStatus } from '../../apis/seatApi';

function AssignSeatDialogForEmpPage({ openAssignSeatDialog,employee,setOpenAssignSeatDialog ,onAssigned}) {

    const [seats,setSeats]=useState([]);
    const [selectedSeat,setSelectedSeat]=useState(null);


    useEffect(()=>{

            if(openAssignSeatDialog){
                 loadFreeSeats();
            }
    },[openAssignSeatDialog]);

    const loadFreeSeats=async ()=>{
     
        const res = await getSeatByStatus("Free");
        setSeats(res.data);

    }

    const handleAssign=async()=>{
       
        if(!selectedSeat) return;

        await assignSeat(selectedSeat.seatId , employee.employeeId);
        
          onAssigned();

    }
   


  return (
    
    <Dialog open={openAssignSeatDialog} onClose={()=>setOpenAssignSeatDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
            Assign Seat to {employee?.name}
        </DialogTitle>
        <DialogContent>
            <SeatGrid
              seats={seats}
              selectedSeat={selectedSeat}
              onSeatClick={setSelectedSeat}
            />

        </DialogContent>

        <DialogActions>
             
             <Button onClick={()=>setOpenAssignSeatDialog(false)}>
                Cancel
             </Button>
             <Button 
              variant="contained"
              disabled={!selectedSeat}
              onClick={handleAssign}
           >
                Assign Seat
             </Button>

        </DialogActions>
    </Dialog>
  )
}

export default AssignSeatDialogForEmpPage
