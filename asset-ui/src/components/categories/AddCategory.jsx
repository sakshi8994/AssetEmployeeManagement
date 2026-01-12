import { Dialog,DialogActions, DialogContent,Button, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const AddCategory = ({openAddDialog,setOpenAddDialog,category,setCategory ,handleAddCategory}) => {
  return (
    <Dialog open={openAddDialog} onClose={()=>setOpenAddDialog(false)}>
        <DialogTitle>
            Add New Category
        </DialogTitle>
        <DialogContent>
           <TextField 
           label="Enter New Category"
           value={category}
           onChange={(e)=>setCategory(e.target.value)}
           />
        </DialogContent>
        <DialogActions>

            <Button 
            varient="outlined"
            onClick={()=>setOpenAddDialog(false)}
            >
                Cancel
            </Button>
           <Button 
           varient="contained"
           onClick={handleAddCategory}
           >
            Add
           </Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddCategory