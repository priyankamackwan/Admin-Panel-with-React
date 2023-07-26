import React from "react";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AppBar, Button, Paper, TextField, Toolbar } from "@mui/material";
import * as Yup from "yup"
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginRequestHandler } from "../Redux/LoginReducer/LoginConstans";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
    email: Yup
      .string()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,{message:'Please enter a valid email address'})
      .required("Please enter a valid email address"),
      password:Yup.string().matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:'Password must be alphanumeric and minimum 8 characters'}).required("Password must be alphanumeric and minimum 8 characters")
 
  });
export default function Login() {
    const dispatch=useDispatch();
     const navigate=useNavigate()
    const formik= useFormik({
        initialValues:{email:'' , password:''},
        validationSchema,
        onSubmit:(values)=>{
            // console.log(values)
             dispatch(loginRequestHandler(values,navigate))
        }
    });
  return <>
  <AppBar>
    <Toolbar>
        Admin Access
    </Toolbar>
  </AppBar>
     <Paper elivation={3} sx={{width:"500px" , height:"300px" , margin:"auto",marginTop:"8%",textAlign:"center"}}>
        <AdminPanelSettingsIcon sx={{fontSize:"60px" , marginTop:"5px" , color:"green"}}/>
         <form onSubmit={formik.handleSubmit} >
        
        
          <Box sx={{width:"80%",display:"flex",justifyContent:"space-between" ,margin:"auto" ,flexDirection:"column" , gap:"20px"}}>
         
          <TextField  type={'email'} variant="outlined"  placeholder='i.e jhon@gmail.com'
          name="email"
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          />
          <TextField  type={'password'} variant="outlined"  placeholder='password'
          onChange={formik.handleChange}
          name='password'
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained">Sign In </Button>
          </Box>
 
          
         </form>
     </Paper>
  </>;
}
