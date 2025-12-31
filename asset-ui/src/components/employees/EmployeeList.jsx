import React, { useEffect,useState } from 'react'
import { searchEmployee } from '../../apis/employeeApi';
import { DataGrid , GridToolbar  } from "@mui/x-data-grid";
import { Box, Typography,Chip ,Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"
import EditEmployeeDialog from "../employees/EditEmployeeDialog"
import { updateEmployee , deleteEmployee } from '../../apis/employeeApi';
import DeleteEmployeeDialog from "../employees/DeleteEmployeeDialog"
import EmployeeFilter from "../employees/EmployeeFilter"
import { exportToExcel } from "../../utils/exportToExcel";
import DownloadIcon from "@mui/icons-material/Download";
import AssignSeatDialog from '../seats/AssignSeatDialog';


function EmployeeList() {
const [employees, setEmployees]=useState([]);
const [page , setPage]=useState(0);
const [rows, setRows] = useState([]);
const [pageSize, setPageSize] = useState(5);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState("");
const [openEditEmp ,setOpenEditEmp]=useState(false);
const [openDeleteEmp ,setOpenDeleteEmp]=useState(false);
const [openAddSeat , setOpenAddSeat]=useState(false);
const [selectedEmployee, setSelectedEmployee]=useState(null);
const [snackbar , setSnackbar] = useState({
    open:false,
    message:"",
    severity:"success"
  });
const [name , setName]=useState("");
const [department , setDepartment]=useState("");
const [designation ,setDesignation]=useState("");
const [email,setEmail] =useState("");
const [employeeId ,setEmployeeId]  =useState("");
const [seat , setSeat]=useState("");




useEffect(()=>{
    loadEmployee();
},[]);


useEffect(()=>{
    loadEmployee();
},[page,pageSize]);

useEffect(()=>{
    loadEmployee();
},[name,department,designation,email,employeeId,seat]);


const loadEmployee= async()=>{
  setLoading(true)
try{
  const res = await searchEmployee({
    page,
    pageSize,
    name : name ||  undefined,
    department:department || undefined,
    designation :designation || undefined,
    email:email || undefined,
    employeeId: employeeId || undefined,

  });
  
  setRows(res.data.content);
  console.log("Employee : ", res.data);
    setTotal(res.data.totalElements);
}catch(error){
  alert(error.response.messege || "Server error");
}finally{
  setLoading(false);
}


}

const handleAddSeat=(employee)=>{

  setOpenAssignSeat(true);
  selectedEmployee(true);
 
  console.log("add seat for employee : ",employee)

}

const openEditModal=(employee)=>{
  setOpenEditEmp(true);
  setSelectedEmployee(employee);
  console.log(" open edit : ",employee);
}

const openDeleteModal=(employee)=>{
  setOpenDeleteEmp(true);
  setSelectedEmployee(employee);
  console.log(" open delete employee",employee);
}


const handleDeleteEmployee = async()=>{
  console.log(" deleted employee: ",selectedEmployee)
   try{
    
const res = await deleteEmployee(selectedEmployee.employeeId);
      setOpenDeleteEmp(false);
      loadEmployee(page,pageSize);
      showSnackbar("Employee Data Deleted Successfully","success");
   }catch(err){
             
    console.log(err);
         showSnackbar("Failed to Delete Employee Data","error");
   }
}


const handleUpdateEmployee = async()=>{

try{
const res = await updateEmployee(selectedEmployee.employeeId , {
  name :selectedEmployee.name,
  department:selectedEmployee.department,
  designation:selectedEmployee.designation,
  email:selectedEmployee.email
});
setOpenEditEmp(false);
loadEmployee(page,pageSize);
showSnackbar("Employee Data Updated Successfully","success");
}catch(err){
 
  console.log(err);
  showSnackbar("Failed to update Employee Data ", "error");

}

}

const showSnackbar = (message, severity) => {
  setSnackbar({
    open: true,
    message,
    severity,
  });
};

const clearEmployeeFilters=()=>{
  setName("");
  setDepartment("");
  setDesignation("");
  setEmail("")
  loadEmployee(0,pageSize);
}




const columns = [

  {
    field: "employeeId",
    headerName: "Employee Id",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },

   {
    field: "designation",
    headerName: "Designation",
    flex: 1,
  },
   {
    field: "email",
    headerName: "Email",
    flex: 1,
  },

   {
    field: "seat",
    headerName: "SeatId",
    flex: 1,
    valueGetter: (value, row) =>
  row?.seat?.seatId ?? "—",
     renderCell:(params)=>{
      const seat = params.row.seat;
     if (!seat) {
      return (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleAddSeat(params.row)}
        >
          Assign Seat
        </Button>
      );
    }
     return seat.seatId;
     }
  
  },
  {
     field: "action",
    headerName: "Action",
    width: 120,
    sortable: false,
    renderCell: (params) => (
         <>


        <IconButton
          color="primary"
          onClick={() => openEditModal(params.row)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => openDeleteModal(params.row)}
        >
          <DeleteIcon />
        </IconButton>
     
       
      </>
    ),
  }

]

  return (
<Box sx={{ height: "600px", width: "100%" }}>

   <Typography variant="h6" mb={2}>
        Employee
      </Typography>

      <Button
  variant="contained"
  color="success"
  startIcon={<DownloadIcon />}
  onClick={() => exportToExcel(rows, "Asset_List")}
>
  Export Excel
</Button>

      <EmployeeFilter
      name={name}
      setName={setName} 
      department={department} 
      setDepartment={setDepartment} 
       designation={designation}
        setDesignation={setDesignation}
         email={email}
          setEmail={setEmail}
          clearEmployeeFilters={clearEmployeeFilters}
      />
    
      {rows && (
        <DataGrid
       rows={rows}
       columns={columns}
       getRowId={(row)=>row.employeeId}
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
            // loadEmployee(model.page, model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
    
            localeText={{
        noRowsLabel: "No Employee found with current filters",
           }}


       />
      )
      
      }

      <EditEmployeeDialog
      openEditEmp={openEditEmp}
       setOpenEditEmp={setOpenEditEmp} 
       selectedEmployee={selectedEmployee} 
       setSelectedEmployee={setSelectedEmployee}
       handleUpdateEmployee={handleUpdateEmployee}
      />

      <DeleteEmployeeDialog
        openDeleteEmp={openDeleteEmp}
         setOpenDeleteEmp={setOpenDeleteEmp}
         handleDeleteEmployee={handleDeleteEmployee}
         
      />

    

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >

       <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>

        </Snackbar>
    
   </Box>
  )
}

export default EmployeeList