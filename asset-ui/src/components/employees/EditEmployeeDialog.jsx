import {Dialog,TextField,Button, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import {useState} from 'react'

const EditEmployeeDialog = ({openEditEmp , setOpenEditEmp ,selectedEmployee,setSelectedEmployee ,handleUpdateEmployee}) => {

    const [errors, setErrors] = useState({});


    const validateForm = () => {
  const newErrors = {};

  if (!selectedEmployee?.name?.trim()) {
    newErrors.name = "Name is required";
  }

  if (!selectedEmployee?.department?.trim()) {
    newErrors.department = "Department is required";
  }

  if (!selectedEmployee?.designation?.trim()) {
    newErrors.designation = "Designation is required";
  }

  if (!selectedEmployee?.email?.trim()) {
    newErrors.email = "Email is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  return (
   <Dialog open={openEditEmp} onClose={()=>setOpenEditEmp(false)}>
    <DialogTitle>Edit Employee</DialogTitle>
    <DialogContent>
   
    <TextField 
       label="Name"
  fullWidth
  margin="dense"
  required
  error={!!errors.name}
  helperText={errors.name}
  value={selectedEmployee?.name || ""}
  onChange={(e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      name: e.target.value,
    });
    setErrors({ ...errors, name: "" });
  }}
       
       />

        <TextField 
       label="Department"
       fullWidth
       margin="dense"
       error={!!errors.department}
       helperText={errors.department}
       value={selectedEmployee?.department || ""}
       onChange={(e)=>{
           setSelectedEmployee({
               ...selectedEmployee,
               department:e.target.value,
           })
            setErrors({ ...errors, department: "" });
       }}
       
       />  
        <TextField 
       label="Designation"
       fullWidth
       margin="dense"
       error={!!errors.designation}
       helperText={errors.designation}
       value={selectedEmployee?.designation || ""}
       onChange={(e)=>{
           setSelectedEmployee({
               ...selectedEmployee,
               designation:e.target.value,
           })
               setErrors({ ...errors,designation: "" });
        }
       }
       />

        <TextField 
       label="Email Id"
       fullWidth
       margin="dense"
       error={!!errors.email}
       helperText={errors.email}
       value={selectedEmployee?.email || ""}
       onChange={(e)=>
          { setSelectedEmployee({
               ...selectedEmployee,
               email:e.target.value,
           })
            setErrors({ ...errors,email: "" });
        }
       }
       />

       

    </DialogContent>

    <DialogActions>
          <Button onClick={() => setOpenEditEmp(false)}>Cancel</Button>
    <Button
  variant="contained"
  onClick={() => {
    if (validateForm()) {
      handleUpdateEmployee();
    }
  }}
>
  Save
</Button>


    </DialogActions>

   </Dialog>
  )
}

export default EditEmployeeDialog