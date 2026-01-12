
import { TextField ,Stack ,Button} from '@mui/material'
import React from 'react'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function HistoryFilters({historyId,setHistoryId,assetTag,setAssetTag,employeeId,setEmployeeId,employeeName,setEmployeeName,action,setAction,timeStamp,setTimeStamp,clearFilters}) {
  return (
   <Stack direction="row" spacing={2} mb={2} >
         
         <TextField
          label="History Id"
          size="small"
          value={historyId}
          onChange={(e)=>setHistoryId(e.target.value)}
          />

           <TextField
          label="Asset Tag"
          size="small"
          value={assetTag}
          onChange={(e)=>setAssetTag(e.target.value)}
          />


           <TextField
          label="Employee Id"
          size="small"
          value={employeeId}
          onChange={(e)=>setEmployeeId(e.target.value)}
          />

          <TextField
          label="Employee Name"
          size="small"
          value={employeeName}
          onChange={(e)=>setEmployeeName(e.target.value)}
          />

            <TextField
          label="Action"
          size="small"
          value={action}
          onChange={(e)=>setAction(e.target.value)}
          />

            <DatePicker
        label="Date"
        value={timeStamp}
        onChange={(newValue) => setTimeStamp(newValue)}
        slotProps={{ textField: { size: "small" } }}
      />
          <Button variant="outlined" onClick={clearFilters}>
            Clear
          </Button>
    
   </Stack>
  )
}

export default HistoryFilters