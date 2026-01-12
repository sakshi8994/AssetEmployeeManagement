import {useState} from 'react'
import {  TextField,MenuItem,Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
const EditAssetDialog = ({openEdit,setOpenEdit,setSelectedAsset,selectedAsset,handleUpdate}) => {

    const [errors, setErrors] = useState({});
  
  
      const validateForm = () => {
    const newErrors = {};
  
    if (!selectedAsset?.brand?.trim()) {
      newErrors.brand = "Brand is required";
    }
  
    if (!selectedAsset?.model?.trim()) {
      newErrors.model = "model is required";
    }
  
    if (!selectedAsset?.status?.trim()) {
      newErrors.status = "status is required";
    }
  
    
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  

  return (
    <Dialog open={openEdit} onClose={()=>setOpenEdit(false)}>
<DialogTitle>Edit Asset </DialogTitle>
<DialogContent>
    <TextField 
    label="Brand"
    fullWidth
    margin="dense"
     error={!!errors.brand}
  helperText={errors.brand}
    value={selectedAsset?.brand || ""}
    onChange={(e)=>
        {setSelectedAsset({
            ...selectedAsset,
            brand:e.target.value,
        })
         setErrors({ ...errors, brand: "" });
      }
    }
    />

   <TextField
      label="Model"
      fullWidth
      margin="dense"
      error={!!errors.model}
  helperText={errors.model}
      value={selectedAsset?.model || ""}
      onChange={(e) =>{
        setSelectedAsset({
          ...selectedAsset,
          model: e.target.value,
        })
       setErrors({ ...errors, model: "" });
      }
      }
    />


 <TextField
      select
      label="Status"
      fullWidth
      margin="dense"
       error={!!errors.status}
  helperText={errors.status}
      value={selectedAsset?.status || ""}
      onChange={(e) =>{
        setSelectedAsset({
          ...selectedAsset,
          status: e.target.value,
        })
      setErrors({ ...errors, status: "" });
      }
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
    <Button variant="contained" onClick={() => {
    if (validateForm()) {
      handleUpdate();
    }
  }}>
      Save
    </Button>
  </DialogActions>

 </Dialog>
  )
}

export default EditAssetDialog