import React, { useState } from 'react'
import { signup } from '../../apis/authApi';
import { TextField ,Box,Button } from '@mui/material';
import { useSnackbar } from '../../context/SnackbarContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
const [email,setEmail]=useState("");
const [name,setName]=useState("")
const [password,setPassword] =useState("");

const [loading,setLoading]=useState(false);

const {showSnackbar}=useSnackbar();

const navigate = useNavigate();

const handleSignup= async()=>{
    setLoading(true);
    try{

        const res = await signup({name,email,password});
        console.log("sign up response : ", res);
        if(res.data==="Email already exists"){
          
             showSnackbar(res.data,"error");
        }else{


             showSnackbar(res.data,"success");
        }
       

        

    }catch(err){
        console.log(err);
        showSnackbar(err.message , "error")

    }finally{
         setLoading(false);
    }
}

  return (
    <>
    <Box sx={{ width: 300, mx: "auto", mt: 10 }}>
      <TextField
      fullWidth
      label="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <br/>
   <TextField
   fullWidth
      label="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <br/>

      <TextField
      fullWidth
      label="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      
      <br/>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={()=>{
          handleSignup()
        navigate("/login")
        }}
        //   disabled={isFormInvalid || loading}
       
      >
         {loading ? "Signing..." : "Sign up"}
      </Button>

    </Box>
    
    </>
  )
}

export default SignupPage