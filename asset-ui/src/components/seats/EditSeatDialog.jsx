

import { Dialog,DialogActions, DialogContent, DialogTitle, TextField , MenuItem , Button} from '@mui/material'
import React from 'react'

function EditSeatDialog({openEditSeat,setOpenEditSeat , selectedSeat,setSelectedSeat , handleUpdateSeat}) {
  return (
    <Dialog open={openEditSeat} onclose={()=>setOpenEditSeat(false)}>
        <DialogTitle>
            Edit Seat Data
        </DialogTitle>
        <DialogContent>
           <TextField 
                  label="Floor"
                  fullWidth
                  margin="dense"
                  value={selectedSeat?.floor || ""}
                  onChange={(e)=>
                      setSelectedSeat({
                          ...selectedSeat,
                          floor:e.target.value,
                      })
                  }
                  />

             <TextField 
                  label="Column"
                  fullWidth
                  margin="dense"
                  value={selectedSeat?.colNum || ""}
                  onChange={(e)=>
                      setSelectedSeat({
                          ...selectedSeat,
                          colNum:e.target.value,
                      })
                  }
                  />

            
             <TextField 
                  label="Column"
                  fullWidth
                  margin="dense"
                  value={selectedSeat?.colNum || ""}
                  onChange={(e)=>
                      setSelectedSeat({
                          ...selectedSeat,
                          colNum:e.target.value,
                      })
                  }
                  />

                   <TextField 
                  label="Row"
                  fullWidth
                  margin="dense"
                  value={selectedSeat?.rowNum || ""}
                  onChange={(e)=>
                      setSelectedSeat({
                          ...selectedSeat,
                          colNum:e.target.value,
                      })
                  }
                  />

                  <TextField
      select
      label="Status"
      fullWidth
      margin="dense"
      value={selectedSeat?.status || ""}
      onChange={(e) =>
        setSelectedSeat({
          ...selectedSeat,
          status: e.target.value,
        })
      }
    >
     <MenuItem value="Free">Free</MenuItem>
      <MenuItem value="Occupied">Occupied</MenuItem>
     

    </TextField>



        </DialogContent>
        <DialogActions>
         <Button onClick={() => setOpenEditSeat(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleUpdateSeat}>
      Save
    </Button>

        </DialogActions>
    </Dialog>
  )
}

export default EditSeatDialog
