import React from 'react'
import {  Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
function RevokeAssetDialog({openRevoke ,setOpenRevoke,handleRevoke}) {
  return (
    <Dialog open={openRevoke} onClose={()=> setOpenRevoke(false)}>
<DialogTitle>Revoke Asset </DialogTitle>

<DialogContent>

are you sure you want to revoke this asset ?

</DialogContent>

<DialogActions>
<Button  onClick={()=>setOpenRevoke(false)}>
Cancel
</Button>

<Button 
color="error"
variant="contained"
onClick={handleRevoke}

>
Revoke
</Button>

</DialogActions>

</Dialog>
  )
}

export default RevokeAssetDialog