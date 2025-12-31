import { Dialog, DialogActions, DialogContent, DialogTitle,Button } from '@mui/material'
import React from 'react'

function DeleteEmployeeDialog({openDeleteEmp , setOpenDeleteEmp ,handleDeleteEmployee }) {
  return (
    <Dialog open={openDeleteEmp} onClose={()=>setOpenDeleteEmp(false)}>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
           Are you sure ?
      </DialogContent>

      <DialogActions>
        
         <Button onClick={() => setOpenDeleteEmp(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleDeleteEmployee}>
      Delete
    </Button>

      </DialogActions>

    </Dialog>
   
  )
}

export default DeleteEmployeeDialog