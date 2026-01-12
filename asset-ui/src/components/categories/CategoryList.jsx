import  {useEffect, useState} from 'react'
import { searchCategory ,addCategory } from '../../apis/categoryApi';
import { DataGrid } from '@mui/x-data-grid';
import { Typography ,Box ,Button } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';

import CategoryFilter from './CategoryFilter';
import AddCategory from './AddCategory';

function CategoryList() {
    const [categories,setCategories]=useState([]);
    const [loading,setLoding]=useState(false);
    const [page,setPage] =useState(0);
    const [pageSize,setPageSize]=useState(5); 
    const [categoryId,setCategoryId]=useState("");
    const [name,setName]=useState("");
    const [total,setTotal]=useState(0);
    const [category,setCategory]=useState("");
    const [openAddDialog,setOpenAddDialog]=useState(false);


     useEffect(() => {
     loadCategories();
  }, []);

  useEffect(() => {
     loadCategories();
  }, [page,pageSize]);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      loadCategories(page, pageSize);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [ categoryId, name]);


    const loadCategories = async()=>{
        setLoding(true);
        console.log("load categories called" , categoryId,name);
        try{
              const res = await searchCategory({
                page,
                pageSize,
                categoryId:categoryId||undefined,
                name:name||undefined

              });
              setCategories(res.data.content);
              console.log(res);
              setTotal(res.data.totalElements);

        }catch(err){
           
            console.log(err);
        }finally{
            setLoding(false);
        }

    }

  const clearFilter =()=>{
    setCategoryId("");
    setName("");
    loadCategories(0,pageSize);
  }  

  const handleAddCategory = async()=>{

    try{
      const res = await addCategory({name:category});
      console.log(res);
      setOpenAddDialog(false);
      loadCategories();
    }catch(err){
        console.log(err);
    }finally{
           setCategory("");
    }
  }
const columns = [
    {
    field:"categoryId",
     headerName:"Category Id",
     flex:1

},
{
 field : "name",
  headerName:"Category Name",
  flex:1   
}

]

  return (

      <Box sx={{ 
      height: "600px",
       width: "100%" }}>

        <Typography>
             
             Category

        </Typography>

        <Button onClick={()=>setOpenAddDialog(true)}>Add Category</Button>

        <CategoryFilter
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          name={name}
          setName={setName}
          clearFilter={clearFilter}
        />

   <DataGrid 
       rows={categories}
         columns={columns}
       
          getRowId={(row) => row.categoryId}
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
          
          }}
          pageSizeOptions={[5, 10, 20]}
    
            localeText={{
    noRowsLabel: "No category found with current filters",
  }}
   />

   <AddCategory
   openAddDialog={openAddDialog}
   setOpenAddDialog={setOpenAddDialog}
   category={category}
   setCategory={setCategory} 
   handleAddCategory={handleAddCategory}
   />


   </Box>
  )
  
}

export default CategoryList;