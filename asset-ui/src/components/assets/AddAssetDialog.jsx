import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCategory } from "../../apis/categoryApi";

export default function AddAssetDialog({openAdd , onClose ,onSave ,categories}){

const [form,setForm]=useState({
    assetTag:"",
    brand:"",
    model:"",
    serialNumber:"",
    categoryId:""
})

const handleChange = (field , value) =>{
setForm({...form , [field]:value})
}

 const handleSubmit = () => {
    onSave(form);
    setForm({assetTag:""});
    setForm({brand:""});
    setForm({model:""});
    setForm({serialNumber:""});
    setForm({categoryId:""});   
  };


  return(
   <Dialog open={openAdd} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle> Add Asset </DialogTitle>
    <DialogContent>
    <Stack spacing={2} mt={1}>
        <TextField
        
         label="Asset Tag"
            value={form.assetTag}
            onChange={(e) => handleChange("assetTag", e.target.value)}
            required
        />


         <TextField
            label="Brand"
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          />

          <TextField
            label="Model"
            value={form.model}
            onChange={(e) => handleChange("model", e.target.value)}
          />

          <TextField
            label="Serial Number"
            value={form.serialNumber}
            onChange={(e) => handleChange("serialNumber", e.target.value)}
          />

           <TextField
            select
            label="Category"
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            required
          >
           
            {categories?.map((cat) => (
              <MenuItem key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </MenuItem>
            ))}

          </TextField>

    </Stack>


    </DialogContent>


   <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>

   </Dialog>


  )

}