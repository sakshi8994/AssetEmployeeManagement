import React, { useEffect, useState } from 'react'
import { searchHistory } from '../../apis/historyApi';
import { Box, Typography,Paper,Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid/internals';
import HistoryFilters from './HistoryFilters';
import dayjs from "dayjs";
import { exportHistoryToExcel } from '../../utils/exportHistoryToExcel';
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from 'react-router-dom';
function HistoryList() {
  const [history , setHistory]=useState([]);
  const [page , setPage] = useState(0);
  const [loading,setLoading] =useState(false);
  const [pageSize,setPageSize]=useState(5)
  const [total,setTotal]=useState(0);

  const [historyId,setHistoryId]=useState("");
  const [assetTag,setAssetTag] =useState("");
  const [employeeId ,setEmployeeId]=useState("");
  const [employeeName,setEmployeeName]=useState("");
  const [action,setAction]=useState("");
  const [timeStamp,setTimeStamp]=useState(null);




  const navigate = useNavigate();

  const formattedDate = timeStamp
  ? dayjs(timeStamp).format("YYYY-MM-DD")
  : undefined;




useEffect(()=>{
   loadHistory();
},[page,pageSize])
 

  useEffect(()=>{ 

 const timer = setTimeout(()=>{
    loadHistory(0,pageSize);
    setPage(0);
    },500)
   
    return () => clearTimeout(timer);

    // loadHistory();
 },[historyId,assetTag,employeeId,employeeName,action,timeStamp])




  const loadHistory = async()=>{
    console.log(formattedDate);
    try{
          const res =  await searchHistory({page, size:pageSize,
            historyId:historyId||undefined,
            assetTag:assetTag||undefined,
            employeeId:employeeId||undefined,
            employeeName:employeeName||undefined,
            action:action||undefined,
           timestamp:formattedDate||undefined
          });
          setHistory(res.data.content);
          setTotal(res.data.totalElements)
          console.log("History : ", res.data.content);

    }catch(err){
        console.log(err.response.message);
    }
   

  }

   


  const formatDateTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
};

const clearFilters=()=>{
  setHistoryId("");
  setAssetTag("");
  setEmployeeId("");
  setEmployeeName("");
  setAction("");
  setTimeStamp(null);
 
  loadHistory(0,pageSize);
}

const columns =[
   {
    field: "historyId",
    headerName: "History Id",
    flex: 1,
  },

  {
    field:"assetTag",
    headerName:"Asset Tag",
    flex:1,
  }, {
    field:"employeeId",
    headerName:"Employee Id",
    flex:1,
  },
  {
    field:"employeeName",
    headerName:"Employee Name",
    flex:1
  },
  {field:"action",
    headerName:"Action",
    flex:1

  },{
    field: "timestamp",
    headerName:"Time Stamp",
    flex:1,
   
     renderCell: (params) => formatDateTime(params.value),
  }
]

  return (
    <Box sx={{ 

         p: 3,
    height: "100%",
    width: "100%",
    // backgroundColor: "#656972ff",
      
      }}
       
       >

       <Box sx={{ mb: 2 }}>
  <Typography variant="h5" fontWeight={600}>
    History
  </Typography>
  {/* <Typography variant="body2" color="text.secondary">
    Track asset and employee activity
  </Typography> */}
</Box>
<Button onClick={()=>navigate("/dashboard")}> Back</Button>

<Button
  variant="contained"
  color="success"
  startIcon={<DownloadIcon />}
  onClick={() => exportHistoryToExcel(history, "Asset_History_List")}
>
  Export Excel
</Button>
   <HistoryFilters
      historyId={historyId}
      setHistoryId={setHistoryId}
      assetTag={assetTag}
      setAssetTag={setAssetTag}
      employeeId={employeeId}
      setEmployeeId={setEmployeeId}
      employeeName={employeeName}
      setEmployeeName={setEmployeeName}
      action={action}
      setAction={setAction}
      timeStamp={timeStamp}
      setTimeStamp={setTimeStamp}
      clearFilters={clearFilters}
      />

      {
        history && (
          <DataGrid   
          
          rows={history}
       columns={columns}
       getRowId={(row)=>row.historyId}
       loading={loading}

        paginationMode="server"
          disableRowSelectionOnClick
         density="compact"
        slots={{toolbar:GridToolbar}}
          rowCount={total}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
            // loadHistory(model.page, model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}

            localeText={{
    noRowsLabel: "No assets History found with current filters",
  }}

    
          />
        )
      }

     
     
       </Box>
  )
}

export default HistoryList