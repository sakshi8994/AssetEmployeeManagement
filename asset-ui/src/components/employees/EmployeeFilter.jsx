import React from 'react'
import { Stack, TextField, MenuItem, Button } from "@mui/material";

const EmployeeFilter = ({name,setName ,department ,setDepartment , designation, setDesignation , email, setEmail ,clearEmployeeFilters }) => {
  return (
   <Stack direction="row" spacing={2} mb={2}>
  <TextField
   label="Name"
   size="small"
   value={name}
   onChange={(e)=>setName(e.target.value)}
   />

   <TextField
   label="Department"
   size="small"
   value={department}
   onChange={(e)=>setDepartment(e.target.value)}
   />

   
   <TextField
   label="Designation"
   size="small"
   value={designation}
   onChange={(e)=>setDesignation(e.target.value)}
   />

   <TextField
   label="Email"
   size="small"
   value={email}
   onChange={(e)=>setEmail(e.target.value)}
   />
   
   <Button variant="outlined" onClick={clearEmployeeFilters}>
     Clear
   </Button>


   </Stack>
  )
}

export default EmployeeFilter