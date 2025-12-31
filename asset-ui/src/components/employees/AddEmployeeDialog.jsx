import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const AddEmployeeDialog = ({openAddEmployee,setOpenAddEmployee,handleSubmitEmployee,onCloseAddEmp}) => {
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
    onSave(form);
    setForm({name:""});
    setForm({department:""});
    setForm({designation:""});
    setForm({email:""});
    setForm({seat:""});   
  };

  return (
    <Dialog open={openAddEmployee} onClose={setOpenAddEmployee(false)}>
        <DialogTitle>Add Employee </DialogTitle>
        <DialogContent>
        <Stack spacing={2} mt={1}>
           
            <TextField
             label="Employee Name"
             value={form.name}
             onChange={(e) => handleChange("assetTag", e.target.value)}
              required
             />
        

        </Stack>
        </DialogContent>
        <DialogActions>
           <Button onClick={onCloseAddEmp}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmitEmployee}>
          Save
        </Button>

        </DialogActions>
    </Dialog>
  )
}

export default AddEmployeeDialog