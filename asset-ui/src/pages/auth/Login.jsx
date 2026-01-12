import {useState} from 'react'
import { login } from '../../apis/authApi';
import { Box, TextField ,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';

const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
      const navigate = useNavigate();
      const { showSnackbar } = useSnackbar();

   const [errors, setErrors] = useState({
  email: "",
  password: ""
});



   const handleLogin = async()=>{

      if (!validateForm()) {
    showSnackbar("Please fix form errors", "warning");
    return;
  }

  setLoading(true);
    
    setLoading(true);
   
    try{
         const res = await login({email,password});
          localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("employeeId", res.data.employeeId);
      navigate("/dashboard");
         console.log("Login response : ",res);

    }catch(err){
        console.log(err);
        showSnackbar("Failed to Login","error");

    }finally{
            setLoading(false);
    }

   }

   const validateForm=()=>{
    let valid = true;
    const newErrors = {email:"" , password:""};

    if(!email.trim()){
        newErrors.email="Email is required";
        valid=false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
         newErrors.email = "Enter a valid email";
    valid = false;
    }

    if (!password.trim()) {
    newErrors.password = "Password is required";
    valid = false;
  }


  setErrors(newErrors);
  return valid;


   }

   const isFormInvalid = !email.trim() || !password.trim();


  

  return (
    <Box sx={{ width: 300, mx: "auto", mt: 10 }}>
      <TextField
      fullWidth
      label="Enter Email"
      value={email}
      onChange={(e)=>{
        setEmail(e.target.value)
        setErrors({ ...errors, email: "" });
 
    }}
       error={!!errors.email}
  helperText={errors.email}
      
      />
      <br/>

      <TextField
      fullWidth
      label="Enter Password"
      value={password}
      onChange={(e)=>{
        setPassword(e.target.value)
        setErrors({ ...errors, password: "" });
    }}
       error={!!errors.password}
  helperText={errors.password}
       
      />

       <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleLogin}
          disabled={isFormInvalid || loading}
      >
         {loading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  )
}

export default Login