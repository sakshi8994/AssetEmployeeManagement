import {useState} from 'react'
import {Dialog, DialogActions, DialogContent, TextField ,Stack ,Button} from '@mui/material'

function AddFloorDialog({ openAddFloorDialog,setOpenAddFloorDialog,onSave}) {
const [form,setForm]=useState({
    floor:"",
    columns:"",
    rows:"",
})

const handleChange = (field , value) =>{
setForm({...form , [field]:value})
}

 const handleSubmit = () => {
    onSave(form);
    setForm({floor:""});
    setForm({columns:""});
    setForm({rows:""});

  };




  return (
    <Dialog open={openAddFloorDialog} onClose={()=>setOpenAddFloorDialog(false)} >
        <DialogContent>
            <Stack spacing={2} mt={1}>

          <TextField 
          label="Enter Floor"
          value={form.floor ||""}
           onChange={(e) => handleChange("floor", e.target.value)}
            required
          />

          <TextField
          label="Enter Number of columns"
          value={form.columns ||""}
          onChange={(e)=>handleChange("columns",e.target.value)}
          required
          />
          <TextField  
          label="Enter Number of rows"
          value={form.rows ||""}
          onChange={(e)=>handleChange("rows",e.target.value)}
          />
          </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>setOpenAddFloorDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddFloorDialog