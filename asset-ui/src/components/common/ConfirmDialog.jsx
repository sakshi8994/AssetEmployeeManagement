import { DialogActions, DialogContent, DialogTitle ,Typography,Button } from '@mui/material'
import React from 'react'

function ConfirmDialog({openConfirmation,setConfirmation,
    title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  severity = "error",
}) {
  return (
    <Dialog open={openConfirmation} onClose={()=>setConfirmation(false)} maxWidth="xs" fullWidth> 
        <DialogTitle>
           {title}
        </DialogTitle>
           <DialogContent dividers>
        <Typography>{message}</Typography>
      </DialogContent>
        <DialogActions>
               <Button onClick={()=>setConfirmation(false)}>
          {cancelText}
        </Button>

        <Button
          color={severity}
          variant="contained"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog