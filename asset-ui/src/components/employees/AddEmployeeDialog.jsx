import { Dialog, DialogActions, DialogContent, DialogTitle ,Stack ,TextField,Button } from '@mui/material'
import React from 'react'

import { useState } from 'react'
import AssignSeatDialogForEmpPage from './AssignSeatDialogForEmpPage'

const AddEmployeeDialog = ({openAddEmployee,setOpenAddEmployee,onSave ,openAssignSeatDialog,setOpenAssignSeatDialog}) => {
  const [form,setForm]=useState({
      name:"",
      department:"",
      designation:"",
      email:"",
      seat:""
  })

  const handleChange = (field , value) =>{
setForm({...form , [field]:value})
}

 const handleSubmit = () => {
    onSave(
    {  
      ...form,
        seatId: selectedSeat?.seatId || null, 
    }
    );
    setForm({name:""});
    setForm({department:""});
    setForm({designation:""});
    setForm({email:""});
    setForm({seat:""});   

    setSelectedSeat(null);
  setOpenAddEmployee(false);
  };

  const [selectedSeat, setSelectedSeat] = useState(null);


  return (
    <Dialog open={openAddEmployee} onClose={()=>setOpenAddEmployee(false)}>
        <DialogTitle>Add Employee </DialogTitle>
        <DialogContent>
        <Stack spacing={2} mt={1}>
           
            <TextField
             label="Employee Name"
             value={form.name}
             onChange={(e) => handleChange("name", e.target.value)}
              required
             />

              <TextField
             label="Department"
             value={form.department}
             onChange={(e) => handleChange("department", e.target.value)}
              required
             />

              <TextField
             label="Designation"
             value={form.designation}
             onChange={(e) => handleChange("designation", e.target.value)}
              required
             />

              <TextField
             label="Email"
             value={form.email}
             onChange={(e) => handleChange("email", e.target.value)}
              required
             />

             <Button 
              variant='contained'
              color='primary'
              onClick={()=>setOpenAssignSeatDialog(true)}
              
             >
                 Assign Seat 
             </Button>


            
             
             <AssignSeatDialogForEmpPage
             openAssignSeatDialog={openAssignSeatDialog}
             setOpenAssignSeatDialog={setOpenAssignSeatDialog} 
             onSeatSelected={(seat)=>{
              setSelectedSeat(seat);
              setOpenAssignSeatDialog(false);
             }}
             newEmployee={true}
             
             
             />
              <TextField
             label="Selected Seat"
             value={selectedSeat?.seatId||""}
             InputProps={{readOnly:true}}
             
             />
             
        

        </Stack>
        </DialogContent>
        <DialogActions>
           <Button onClick={()=>setOpenAddEmployee(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>

        </DialogActions>
    </Dialog>
  )
}

export default AddEmployeeDialog