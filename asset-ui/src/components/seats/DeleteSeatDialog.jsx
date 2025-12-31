import { Dialog, DialogActions, DialogContent, DialogTitle , Button } from "@mui/material"
const DeleteSeatDialog = ({openDeleteSeat , setOpenDeleteSeat,handleDeleteSeat}) => {
  return (
   <Dialog open={openDeleteSeat} onClose={()=>setOpenDeleteSeat(false)}>

    <DialogTitle>
         Delete Seat
    </DialogTitle>

           <DialogContent>
                 Are you sure ? 
           </DialogContent>
           <DialogActions>
               <Button onClick={() => setOpenDeleteSeat(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleDeleteSeat}>
      Delete
    </Button>
           </DialogActions>
   </Dialog>
  )
}

export default DeleteSeatDialog