import React from 'react'
import { Stack, TextField, MenuItem, Button } from "@mui/material";
function AssetFilters({brand,setBrand,model,setModel,employee,setEmployee,status,setStatus,categoryId,setCategoryId,categoryList,clearFilters}) {
  return (
    <Stack direction="row" spacing={2} mb={2} >
 
 

 <TextField
 label="Brand"
 size="small"
 value={brand}
 onChange={(e)=>setBrand(e.target.value)}
 />

 <TextField
 label="Model"
 size="small"
 value={model}
 onChange={(e)=>setModel(e.target.value)}
 />

 <TextField
 label="Employee Name"
 size="small"
 value={employee}
 onChange={(e)=>setEmployee(e.target.value)}
 />


 <TextField
    select
    label="Status"
    size="small"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    sx={{ minWidth: 150 }}
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="Assigned">Assigned</MenuItem>
    <MenuItem value="Repair">Repair</MenuItem>
    <MenuItem value="Retired">Retired</MenuItem>
    <MenuItem value="Available">Available</MenuItem>
  </TextField>

 <TextField
  select
  label="Category"
  size="small"
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
  sx={{ minWidth: 150 }}
>
  <MenuItem value="">All</MenuItem>

  {categoryList.map((cat) => (
    <MenuItem key={cat.categoryId} value={cat.categoryId}>
      {cat.name}
    </MenuItem>
  ))}
</TextField>

<Button variant="outlined" onClick={clearFilters}>
  Clear
</Button>


</Stack>
  )
}

export default AssetFilters