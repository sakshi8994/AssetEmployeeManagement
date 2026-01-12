import React from 'react'
import { Stack, TextField ,Button} from '@mui/material'

const CategoryFilter = ({categoryId,setCategoryId,name,setName,clearFilter}) => {
  return (
     <Stack direction="row" spacing={2} mb={2} >
     <TextField  
     label="Category ID"
     size="small"
     value={categoryId}
     onChange={(e)=>setCategoryId(e.target.value)}
     />
     <TextField
       label="Name"
       size="small"
       value={name}
       onChange={(e)=>setName(e.target.value)}
     />
     <Button 
     varient="outlined"
     onClick={clearFilter}
     >
        Clear
     </Button>

     </Stack>
  )
}

export default CategoryFilter