import { DataGrid } from "@mui/x-data-grid";
import { Chip, IconButton ,Box,Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function SeatTable({rows, total,page,pageSize,setPage,setPageSize,onEditSeat,onDeleteSeat ,loading , openRevokeModelSeat,openAssignModalSeat}) {

    const columns = [
           { field: "seatId", headerName: "Seat ID", flex: 1 },
    { field: "floor", headerName: "Floor", flex: 1 },
    { field: "rowNum", headerName: "Row", flex: 1 },
    { field: "colNum", headerName: "Column", flex: 1 },
    {
        field :"status" , headerName:"Status",flex:1,
         renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Free" ? "success" : "error"}
          size="small"
        />
      ),
    },
    {

        field:"action",
        headerName :"Action",
        flex:1,
        renderCell:(params)=>(
            <>
          <IconButton onClick={() => onEditSeat(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            disabled={params.row.status === "Occupied"}
            onClick={() => onDeleteSeat(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
        )
    },

     {
    field:"actions",
    headerName:"Actions",
    width:180,
    renderCell :(params)=>{
        const seat = params.row;
        return(
            <>
            {seat.status === "Occupied" ?(
           <Button 
           
           size="small"
           color="error"
           onClick={()=>openRevokeModelSeat(seat)}            
           >

            Revoke
           </Button>

            ):(
             
                 <Button
            size="small"
            color="primary"
            onClick={() => openAssignModalSeat(seat)}
           
          >
            Assign
          </Button>


            )
        
        }

            </>
        );
    }
  },
    ]
  return (
    
    
      <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row)=>row.seatId}
      loading={loading}
      paginationMode="server"
      rowCount={total}
      paginationModel={{ page, pageSize }}
       onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          
          }}
      pageSizeOptions={[5, 10, 20]}
      disableRowSelectionOnClick
      density="compact"
      />

     
    
  )
}

export default SeatTable