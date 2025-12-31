import { Dialog,DialogActions, DialogContent, DialogTitle ,Button} from '@mui/material'
import React from 'react'

function RevokeSeatDialog({openRevokeSeatDialog,setOpenRevokeSeatDialog,handleRevokeSeat}) {
  return (
   <Dialog open={openRevokeSeatDialog} onClose={()=>setOpenRevokeSeatDialog(false)}>
    <DialogTitle> Revoke Seat</DialogTitle>

    <DialogContent>

are you sure you want to revoke this seat ?
    </DialogContent>
    <DialogActions>
        <Button  onClick={()=>setOpenRevokeSeatDialog(false)}>
Cancel
</Button>

<Button 
color="error"
variant="contained"
onClick={handleRevokeSeat}

>
Revoke
</Button>

    </DialogActions>
   </Dialog>
  )
}

export default RevokeSeatDialog