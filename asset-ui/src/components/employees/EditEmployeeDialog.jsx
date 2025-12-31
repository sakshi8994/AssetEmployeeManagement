import {Dialog,TextField,Button, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const EditEmployeeDialog = ({openEditEmp , setOpenEditEmp ,selectedEmployee,setSelectedEmployee ,handleUpdateEmployee}) => {
  return (
   <Dialog open={openEditEmp} onClose={()=>setOpenEditEmp(false)}>
    <DialogTitle>Edit Employee</DialogTitle>
    <DialogContent>
   
    <TextField 
       label="Name"
       fullWidth
       margin="dense"
       value={selectedEmployee?.name || ""}
       onChange={(e)=>
           setSelectedEmployee({
               ...selectedEmployee,
               name:e.target.value,
           })
       }
       />

        <TextField 
       label="Department"
       fullWidth
       margin="dense"
       value={selectedEmployee?.department || ""}
       onChange={(e)=>
           setSelectedEmployee({
               ...selectedEmployee,
               department:e.target.value,
           })
       }
       />  
        <TextField 
       label="Designation"
       fullWidth
       margin="dense"
       value={selectedEmployee?.designation || ""}
       onChange={(e)=>
           setSelectedEmployee({
               ...selectedEmployee,
               designation:e.target.value,
           })
       }
       />

        <TextField 
       label="Email Id"
       fullWidth
       margin="dense"
       value={selectedEmployee?.email || ""}
       onChange={(e)=>
           setSelectedEmployee({
               ...selectedEmployee,
               email:e.target.value,
           })
       }
       />

       

    </DialogContent>

    <DialogActions>
          <Button onClick={() => setOpenEditEmp(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleUpdateEmployee}>
      Save
    </Button>

    </DialogActions>

   </Dialog>
  )
}

export default EditEmployeeDialog