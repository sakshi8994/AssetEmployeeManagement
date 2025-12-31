import { useEffect, useState } from "react";
import { searchSeats ,updateSeat ,deleteSeat, addFloor, assignSeat, releaseSeat } from "../../apis/seatApi";
import SeatTable from "../../components/seats/SeatTable";
import SeatFilters from "../../components/seats/SeatFilters";
import { Box , Typography ,Button } from "@mui/material";
import EditSeatDialog from "../../components/seats/EditSeatDialog";
import DeleteSeatDialog from "../../components/seats/DeleteSeatDialog";
import AddFloorDialog from "../../components/seats/AddFloorDialog";
import AssignSeatDialog from "../../components/seats/AssignSeatDialog";
import { getAllEmployee } from "../../apis/employeeApi";
import RevokeSeatDialog from "../../components/seats/RevokeSeatDialog";
import SeatGrid from "../../components/seats/SeatGrid";


function SeatManagement() {

const [seats, setSeats] = useState([]);
const [loading, setLoading] = useState(false);

const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState(5);
const [total, setTotal] = useState(0);

const [floor, setFloor] = useState("");
const [status, setStatus] = useState("");
const [seatId, setSeatId] = useState("");
const [colNum , setColNum] =useState("");
const [rowNum , setRowNum] =useState("");

const [openAdd, setOpenAdd] = useState(false);
const [openEditSeat, setOpenEditSeat] = useState(false);
const [openDeleteSeat, setOpenDeleteSeat] = useState(false);

const [selectedSeat, setSelectedSeat] = useState(null);

const [openAddFloorDialog,setOpenAddFloorDialog] = useState(false);
const [employeeList , setEmployeeList] =useState([]);
const [selectedEmployee,setSelectedEmployee]=useState("");
const [openAssignSeat, setOpenAssignSeat]=useState(false);
const [errorMsg ,setErrorMsg]=useState("");

const [openRevokeSeatDialog,setOpenRevokeSeatDialog]=useState(false);
const [viewMode, setViewMode] = useState("table");


useEffect(()=>{
loadSeats();
},[])

useEffect(()=>{
loadSeats();
},[pageSize ,page ,floor, seatId, status,colNum,rowNum])

const loadSeats = async()=>{
setLoading(true);

try{
const res = await searchSeats({
      page,
      size: pageSize,
      floor: floor || undefined,
      status: status || undefined,
      seatId : seatId || undefined,
      colNum : colNum || undefined,
      rowNum : rowNum || undefined,
    }

)
setSeats(res.data.content);
console.log("Seats : " ,seats);
setTotal(res.data.totalElements)

} catch(err){

console.error("Failed to load seats", err);

}finally{
  setLoading(false); 

}



}

const onEditSeat=(seat)=>{
  setOpenEditSeat(true);
  setSelectedSeat(seat)
console.log("Seat Edit" , seat);
}

const onDeleteSeat=(seat)=>{
  setOpenDeleteSeat(true);
  setSelectedSeat(seat)
console.log("Seat Delete");
}


const handleDeleteSeat = async()=>{

  console.log("handle delete seat : " , selectedSeat);
try{
  const res = await deleteSeat(selectedSeat.seatId)
  setOpenDeleteSeat(false);
  loadSeats(page,pageSize);


}catch(err){
     console.log("Error at the time of deleting seat : ",err);
}

}



const handleUpdateSeat = async()=>{
  console.log("Selected Seat : ", selectedSeat)
  try{
  const res =  await updateSeat(selectedSeat.seatId ,{
    floor : selectedSeat.floor,
    colNum : selectedSeat.colNum,
    rowNum : selectedSeat.rowNum,
    status : selectedSeat.status
     
  });
  setOpenEditSeat(false);
  loadSeats(page , pageSize)
  }catch(err){
         console.log("Error at time of updating seat : " , err);
  }
 

}


const loadEmployees = async (payload)=>{
  setLoading(true);
  try{
   const res = await getAllEmployee();
   setEmployeeList(res.data);


  }catch(err){
    console.log(err);
  }finally{
    setLoading(false);
  }
}


const handleAddFloor = async (payload) => {
  try {
    const res = await addFloor(payload);
    console.log("Floor created:", res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setOpenAddFloorDialog(false);
  }
};

const openRevokeModelSeat =(seat)=>{
setSelectedSeat(seat);
setOpenRevokeSeatDialog(true)
}

const openAssignModalSeat=(seat)=>{

setSelectedSeat(seat);

     setSelectedEmployee(null);
  setErrorMsg("");
  setOpenAssignSeat(true);
    loadEmployees();
}

const handleAssignSeat = async()=>{

  try{

    const res = await assignSeat(selectedSeat.seatId,selectedEmployee.employeeId)
    console.log("selected seat : ",selectedSeat);
    console.log("selected employee : ",selectedEmployee)
     loadSeats(page,pageSize);
     console.log("res : ",res)

  }catch(err){
    console.log(err);

  }finally{
    setOpenAssignSeat(false);
  }
}

const handleRevokeSeat= async()=>{
  try{
    const res = await releaseSeat(selectedSeat.seatId);
    loadSeats(page,pageSize);

  }catch(err){
console.log("err",err)
  }finally{
    setOpenRevokeSeatDialog(false);
  }
}

  return (
  <Box sx={{ height: "600px", width: "100%" }}>

   <Typography variant="h6" mb={2}>
        Seats
      </Typography>

     


  <SeatFilters
  seatId={seatId}
   setSeatId={setSeatId}
   status={status}
   setStatus={setStatus}
   floor={floor}
   setFloor={setFloor}
   colNum={colNum}
   setColNum={setColNum}
   rowNum={rowNum}
   setRowNum={setRowNum}
  />
  <Button onClick={()=>setOpenAddFloorDialog(true)}>Add Floor</Button>

   <Button onClick={() => setViewMode("table")}>Table</Button>
<Button onClick={() => setViewMode("grid")}>Grid</Button>


{viewMode === "table" ? (
 <SeatTable 
  rows={seats} 
  total={total}
  page={page}
  pageSize={pageSize}
  setPage={setPage}
  setPageSize={setPageSize}
  onEditSeat={onEditSeat}
  onDeleteSeat={onDeleteSeat}
  loading={loading}
  openRevokeModelSeat={openRevokeModelSeat}
  openAssignModalSeat={openAssignModalSeat}

  />
) : (
  <SeatGrid seats={seats} />
)}


 

  <EditSeatDialog
  openEditSeat={openEditSeat}
  setOpenEditSeat={setOpenEditSeat}
   selectedSeat={selectedSeat}
   setSelectedSeat={setSelectedSeat} 
   handleUpdateSeat={handleUpdateSeat}
  />
  
  <DeleteSeatDialog 
  openDeleteSeat={openDeleteSeat} 
   setOpenDeleteSeat={setOpenDeleteSeat}
   handleDeleteSeat={handleDeleteSeat}
  />

  <AddFloorDialog
  openAddFloorDialog={openAddFloorDialog}
  setOpenAddFloorDialog={setOpenAddFloorDialog}
  onSave={handleAddFloor}
  
  />

  <AssignSeatDialog
  openAssignSeat={openAssignSeat}
  setOpenAssignSeat={setOpenAssignSeat}
  employeeList={employeeList}
  selectedEmployee={selectedEmployee}
  setSelectedEmployee={setSelectedEmployee} 
  selectedSeat={selectedSeat}
  handleAssignSeat={handleAssignSeat}
  errorMsg={errorMsg}
  setSelectedSeat={setSelectedSeat}
  // seats={seats}
  />

  <RevokeSeatDialog
  openRevokeSeatDialog={openRevokeSeatDialog}
  setOpenRevokeSeatDialog={setOpenRevokeSeatDialog}
  handleRevokeSeat={handleRevokeSeat}
  />

  </Box>  
  )
}

export default SeatManagement