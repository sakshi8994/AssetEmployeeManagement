import { useEffect, useState } from "react";
import { assignAsset, getAssets, revokeAsset,updateAsset } from "../../apis/assetApi";
import { DataGrid , GridToolbar  } from "@mui/x-data-grid";
import { Box, Typography,Chip ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../apis/categoryApi";
import { getAllEmployee } from "../../apis/employeeApi";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"
import { exportToExcel } from "../../utils/exportToExcel";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";
import AssetFilters from "./AssetFilters";
import AssignAssetDialog from "./AssignAssetDialog";

import RevokeAssetDialog from "./RevokeAssetDialog";
import EditAssetDialog from "./EditAssetDialog";

import AddAssetDialog from "./AddAssetDialog";
import { createAsset } from "../../apis/assetApi";


export default function AssetList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [brand,setBrand]=useState("");
  const [model,setModel]=useState("");
  const [status ,setStatus] =useState("");
  const [employee ,setEmployee]=useState("");
  const [categoryId ,setCategoryId]=useState("");
  const [categoryList , setCategoryList]=useState([]);
  const [openAssign ,setOpenAssign]= useState(false);
  const [openRevoke, setOpenRevoke]=useState(false);
  const [selectedAsset ,setSelectedAsset ]= useState(null);
  const [employeeId , setEmployeeId]=useState("");
  const [errorMsg ,setErrorMsg] = useState("");
  const [employeeList , setEmployeeList] =useState([]);
  const [selectedEmployee , setSelectedEmployee] =useState(null);
  const [snackbar , setSnackbar] = useState({
    open:false,
    message:"",
    severity:"success"
  })
const [openEdit, setOpenEdit] = useState(false);
const [openAdd, setOpenAdd] = useState(false);




 


    const navigate = useNavigate();
   

  useEffect(() => {
   getCategoryList();
  }, []);



  useEffect(() => {
   
    const timer = setTimeout(()=>{
    loadAssets(0, pageSize);
    setPage(0);
    },500)
   
    return () => clearTimeout(timer);
 


}, [brand, model, status,employee,categoryId]);


const getCategoryList = async()=>{
    try{
  
        const res = await getAllCategory();
        
        setCategoryList(res.data);
        console.log("category : ",res);

    }catch(err){

 console.error(err);

    }
}

const clearFilters = () => {
  setBrand("");
  setModel("");
  setStatus("");
  setEmployee("");
  setCategoryId("");
  setSearch("");
  setPage(0);
  loadAssets(0, pageSize);
};

  const loadEmployees = async()=>{
      
    try{
       const res = await getAllEmployee();
       setEmployeeList(res.data);
    }catch(e){
          console.error("Failed to load employees", e);
    }
  }

  const loadAssets = async (page, size) => {
    setLoading(true);
    try {
      const res = await getAssets({ 
        page,
         size,
         search,
           brand: brand || undefined,
      model: model || undefined,
      status: status || undefined,
      employeeName:employee|| undefined,
      categoryId:categoryId || undefined
    });
      setRows(res.data.content);
       console.log("rows : ",rows);      
      setTotal(res.data.totalElements);
      console.log(rows);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
  try {
    await updateAsset(selectedAsset.assetId, {
      brand: selectedAsset.brand,
      model: selectedAsset.model,
      status: selectedAsset.status,
    });

    setOpenEdit(false);
    loadAssets(page, pageSize);

    showSnackbar("Asset updated successfully", "success");
  } catch (e) {
    showSnackbar("Update failed", "error");
  }
};


const handleAddAsset = async (payload) => {
  try {
    await createAsset(payload);

    setOpenAdd(false);
    loadAssets(page, pageSize);

    showSnackbar("Asset added successfully", "success");
  } catch (e) {
    showSnackbar(
      e.response?.data?.message || "Failed to add asset",
      "error"
    );
  }
};


  const openAssignModal=(asset)=>{
    setSelectedAsset(asset);
     setEmployeeId("");
     setSelectedEmployee(null);
  setErrorMsg("");
    setOpenAssign(true);
    loadEmployees();
  }

  const openRevokeModel=(asset)=>{
    setSelectedAsset(asset);
    setOpenRevoke(true);

  }

  const handleAssign = async()=>{
    
    console.log("Selected Asset : " ,selectedAsset);

    if (!selectedEmployee) {
        setSnackbar({
      open: true,
      message: "Please select an employee",
      severity: "error",
    });
    setErrorMsg("Please select an employee");
    return;
  }
  

try{
    setErrorMsg("");
 await assignAsset(selectedAsset.assetId,selectedEmployee.employeeId
);
    setOpenAssign(false);
    // setEmployeeId("");
    loadAssets(page,pageSize);

     setSnackbar({
      open: true,
      message: "Asset assigned successfully",
      severity: "success",
    });
}catch(err){
       
    const message = err.response?.data?.message || "Assignment failed";
    setErrorMsg(message);

     setSnackbar({
      open: true,
      message:
        err.response?.data?.message || "Assignment failed",
      severity: "error",
    });
}
   
  }

  const handleRevoke = async ()=>{
    console.log("selected Asset ", selectedAsset);
   const res= await revokeAsset(selectedAsset.assetId);
console.log("Res : " ,res);
    setOpenRevoke(false);
    loadAssets(page,pageSize);

  }

  const openEditModal = (asset) => {
  setSelectedAsset(asset);
  setOpenEdit(true);
};

const openDeleteDialog = (asset) => {
  setSelectedAsset(asset);
  setOpenDelete(true);
};

const showSnackbar = (message, severity) => {
  setSnackbar({
    open: true,
    message,
    severity,
  });
};


 const columns = [
  {
    field: "assetTag",
    headerName: "Asset Tag",
    flex: 1,
  },
  {
    field: "brand",
    headerName: "Brand",
    flex: 1,
  },
  {
    field: "model",
    headerName: "Model",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    valueGetter: (value, row) =>
      row?.category?.name ?? "—",
  },
 {
  field: "status",
  headerName: "Status",
  flex: 1,
  renderCell: (params) => {
    const status = params.value;

    const colorMap = {
      Assigned: "success",
      Repair: "warning",
      Retired: "error",
    };

    return (
      <Chip
        label={status}
        color={colorMap[status] || "default"}
        size="small"
      />
    );
  },
},

  {
    field: "assignedTo",
    headerName: "Assigned To",
    flex: 1,
    valueGetter: (value, row) =>
      row?.assignedTo?.name ?? "Unassigned",
  },

  {
    field:"actions",
    headerName:"Actions",
    width:180,
    renderCell :(params)=>{
        const asset = params.row;
        return(
            <>
            {asset.status === "Assigned" ?(
           <Button 
           
           size="small"
           color="error"
           onClick={()=>openRevokeModel(asset)}            
           >

            Revoke
           </Button>

            ):(
             
                 <Button
            size="small"
            color="primary"
            onClick={() => openAssignModal(asset)}
           
          >
            Assign
          </Button>


            )
        
        }

            </>
        );
    }
  },
  {
     field: "edit",
    headerName: "Edit",
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

       
      </>
    ),
  }

];


  return (
    <Box sx={{ 
      height: "600px",
       width: "100%" }}>
      <Typography variant="h6" mb={2}>
        Assets
      </Typography>



<Button
  variant="contained"
  color="success"
  startIcon={<DownloadIcon />}
  onClick={() => exportToExcel(rows, "Asset_List")}
>
  Export Excel
</Button>

<Button
  variant="contained"
  color="primary"
  onClick={() => setOpenAdd(true)}
>
  Add Asset
</Button>


<AssetFilters  
brand={brand}
setBrand={setBrand}
model={model}
setModel={setModel}
employee={employee}
setEmployee={setEmployee}
status={status}
setStatus={setStatus}
categoryId={categoryId}
setCategoryId={setCategoryId}
categoryList={categoryList}
clearFilters={clearFilters}
/>

      {rows && (
        <DataGrid
          rows={rows}
         columns={columns}
       
          getRowId={(row) => row.assetId}
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
            loadAssets(model.page, model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
    
            localeText={{
    noRowsLabel: "No assets found with current filters",
  }}


        />
      )}



<AssignAssetDialog 
 openAssign={openAssign}
 setOpenAssign={setOpenAssign}
 employeeList={employeeList}
 selectedEmployee={selectedEmployee}
 setSelectedEmployee={setSelectedEmployee}
 handleAssign={ handleAssign}
 errorMsg={errorMsg}
 selectedAsset={selectedAsset}
/>




<RevokeAssetDialog
openRevoke={openRevoke} 
setOpenRevoke={setOpenRevoke}
handleRevoke={handleRevoke}
/>





<EditAssetDialog 
openEdit={openEdit}
setOpenEdit={setOpenEdit}
setSelectedAsset={setSelectedAsset}
selectedAsset={selectedAsset}
handleUpdate={handleUpdate}
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


<AddAssetDialog
  openAdd={openAdd}
  onClose={() => setOpenAdd(false)}
  onSave={handleAddAsset}
  categories={categoryList}
/>




    </Box>
  );
}
