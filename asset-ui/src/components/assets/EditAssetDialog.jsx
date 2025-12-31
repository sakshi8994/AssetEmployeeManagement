import React from 'react'
import {  TextField,MenuItem,Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
const EditAssetDialog = ({openEdit,setOpenEdit,setSelectedAsset,selectedAsset,handleUpdate}) => {
  return (
    <Dialog open={openEdit} onClose={()=>setOpenEdit(false)}>
<DialogTitle>Edit Asset </DialogTitle>
<DialogContent>
    <TextField 
    label="Brand"
    fullWidth
    margin="dense"
    value={selectedAsset?.brand || ""}
    onChange={(e)=>
        setSelectedAsset({
            ...selectedAsset,
            brand:e.target.value,
        })
    }
    />

   <TextField
      label="Model"
      fullWidth
      margin="dense"
      value={selectedAsset?.model || ""}
      onChange={(e) =>
        setSelectedAsset({
          ...selectedAsset,
          model: e.target.value,
        })
      }
    />


 <TextField
      select
      label="Status"
      fullWidth
      margin="dense"
      value={selectedAsset?.status || ""}
      onChange={(e) =>
        setSelectedAsset({
          ...selectedAsset,
          status: e.target.value,
        })
      }
    >
     <MenuItem value="Available">Available</MenuItem>
      <MenuItem value="Assigned">Assigned</MenuItem>
      <MenuItem value="Repair">Repair</MenuItem>
      <MenuItem value="Retired">Retired</MenuItem>

    </TextField>

</DialogContent>

 <DialogActions>
    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleUpdate}>
      Save
    </Button>
  </DialogActions>

 </Dialog>
  )
}

export default EditAssetDialog