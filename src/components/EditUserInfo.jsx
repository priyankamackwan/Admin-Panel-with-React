import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { allUserRequestHandler } from '../Redux/AllUserRedux/AllUserConstant';
import { updateUserHanlder, updateUserHanlder2 } from '../Service/api';
import Swal from "sweetalert2"
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '60%',
    maxHeight:500,
    bgcolor: 'background.paper',
     borderRadius:"8px",
    boxShadow: 24,
    p: 4,
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .matches(/^[a-zA-Z]/)
      .required("First Name must be a alphabates"),
    lastName: yup
      .string()
      .matches(/^[a-zA-Z]/)
      .required("Last Name must be a alphabates"),
    email: yup
      .string()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required("Please enter a valid email address"),
    phone: yup
      .string()
      .matches(/^\d{10}$/)
      .required("Phone number must be 10 digit"),
  });
export default function EditUserInfo({isOpen ,handleClose , updateUser }) {
  const [imageInput,setImageInput]=useState({});
      // *? modal states and handlers
      const dispatch=useDispatch()
//console.log("clicked update user info",updateUser)
  const formik = useFormik({
    initialValues:{
      _id:updateUser._id ||'',
      firstName:updateUser.firstName ||"",
      lastName:updateUser.lastName||"",
      email:updateUser.email||"",
      phone:updateUser.phone||"",
      gender:updateUser.gender||"other",
      profile_pic:updateUser.profile_pic || ""
    },
    enableReinitialize:true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // ! if user selected new photo then  this block will reun
            if(imageInput?.name){
              let form= new FormData();
              form={...values,profile_pic:imageInput}
      
               const response= await updateUserHanlder(form);
                dispatch(allUserRequestHandler());
                handleClose()
                Swal.fire("User Information Updated","Operation Successfull","success")
                 setTimeout(() => {
                 
                 }, 3000);
            setImageInput({})
            }

            // !? default update route
            else {
      
               const response= await updateUserHanlder2(values);
                dispatch(allUserRequestHandler());
                handleClose()
                Swal.fire("User Information Updated","Operation Successfull","success")
                 setTimeout(() => {
                 
                 }, 3000);
            }
                
          // console.log("updated user record",response)
          
      } catch (error) {
        handleClose()
        Swal.fire("Each field must have value!!","Error occured??","error")
        console.log(error.message);
      }
    },
  });
 console.log("update user state" , formik.values)

 console.log('selected image state',imageInput)
  return (
   <>
     <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="4" component="h2" sx={{textAlign:"center" , marginBottom:"9px"}}>
            Edit User Information
          </Typography>
          <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <Box sx={{display:"flex" , width:"100%",  justifyContent:"space-between",flexWrap:"wrap",padding:"5px"}}>
            <TextField variant='outlined' placeholder='First Name '
             name='firstName'
             value={formik.values.firstName}
             onChange={formik.handleChange}
             error={formik.touched.firstName && Boolean(formik.errors.firstName)}
             helperText={formik.touched.firstName && formik.errors.firstName}
             sx={{width:"45%"}}
            />
            <TextField placeholder='Last Name '
             name='lastName'
             value={formik.values.lastName}
             onChange={formik.handleChange}
             error={formik.touched.lastName && Boolean(formik.errors.lastName)}
             helperText={formik.touched.lastName && formik.errors.lastName}
             sx={{width:"45%"}}
            />
           </Box>
           <Box sx={{display:"flex" , justifyContent:"space-between",flexWrap:"wrap",padding:"5px"}}>
            <TextField placeholder='Email '
              name='email'
             value={formik.values.email}
             onChange={formik.handleChange}
             error={formik.touched.email && Boolean(formik.errors.email)}
             helperText={formik.touched.email && formik.errors.email}
             sx={{width:"45%"}}
            />
            <TextField placeholder='Phone '
             name='phone'
             value={formik.values.phone}
             onChange={formik.handleChange}
             error={formik.touched.phone && Boolean(formik.errors.phone)}
             helperText={formik.touched.phone && formik.errors.phone}
             sx={{width:"45%"}}
            />
           </Box>
           <div>
            <span>{imageInput?.name?imageInput?.name :updateUser?.profile_pic?.slice(-20)}</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="image/*" type="file" name="profile_pic" onChange={(e)=>{
                        //  console.log('selected target file info',e.target.files)
                      setImageInput(e.target.files[0])
                    }} required/>
                    <PhotoCamera />
                  </IconButton>
                </div>

           <Box>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button variant='outlined' onClick={()=>{
             setImageInput({});
             handleClose()
          }}>Cancel</Button>
          <Button variant='outlined' type='submit' onClick={ formik.handleSubmit    
          }  sx={{marginLeft:"10px"}}>Update</Button>
          </form>
        </Box>
      </Modal>
    </div>
   
   </>
  )
}
