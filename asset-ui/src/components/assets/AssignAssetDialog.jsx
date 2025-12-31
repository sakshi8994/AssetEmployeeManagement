import React from 'react'
import {  Typography, TextField,Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
 import Autocomplete from "@mui/material/Autocomplete";
const AssignAssetDialog = ({
    openAssign ,setOpenAssign,employeeList,selectedEmployee,setSelectedEmployee ,handleAssign ,errorMsg,selectedAsset 
}) => {



  return (
    <Dialog open={openAssign} onClose={()=> setOpenAssign(false)}>

<DialogTitle> Assign Asset </DialogTitle>

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

{errorMsg && (

<Typography color="error" mt={1}>
    {errorMsg}
</Typography>

)}

</DialogContent>

<DialogActions>
<Button onClick={()=>setOpenAssign(false)}>Cancel</Button>

<Button 

variant="contained"
onClick={handleAssign}

disabled={selectedAsset !== "Available"}

>
Assign
</Button>
</DialogActions>

</Dialog>

  )
}

export default AssignAssetDialog