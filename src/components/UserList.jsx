import styled from "@emotion/styled";
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Stack } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux"
import Swal from 'sweetalert2'

import React, { useState } from "react";
import { allUserRequestHandler, deleteUser, success } from "../Redux/AllUserRedux/AllUserConstant";

import { deleteUserRequest, getAllUsers } from "../Service/api";
import EditUserInfo from "./EditUserInfo";
const styleTableCell={
  backgroundColor:"black",
  color:"white"
}
const columnHeads=["First Name","Last Name" , "Email","Phone","Gender","Profile Image","Actions"]
export default function UserList({allUsers}) {
  const dispatch=useDispatch();
  const [updateUser,setUpdateUser]=useState({})
  const  [isOpen,setIsOpen]=useState(false)
  const handleClose=()=>{
    setIsOpen(false)

  }
  // console.log('alluser data',allUsers)
  return (
    <>
     <Box sx={{width:"80%" , margin:"auto" , marginTop:"40px"}}>
         <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader >
            <TableHead>
              <TableRow >
              {columnHeads.map((head)=>{
                return (
                  <TableCell sx={styleTableCell}>{head}</TableCell>
                )
              })}
              
              </TableRow>

            </TableHead>

            <TableBody>
            {
                allUsers.map((user , index)=>{
                  // console.log('profle pick',user.profile_pic)
                  return (
                    <TableRow key={user._id}>
                    
                         <TableCell>{user.firstName}</TableCell>
                         <TableCell>{user.lastName}</TableCell>
                         <TableCell>{user.email}</TableCell>
                         <TableCell>{user.phone}</TableCell>
                         <TableCell>{user.gender}</TableCell>
                         <TableCell> {user.profile_pic?<Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${user.profile_pic}`}/>:<Avatar/>}</TableCell>
                         <TableCell>
                          <Stack direction='row' spacing={2}>
                             <EditIcon sx={{cursor:"pointer" , color:"green"}} onClick={()=>{
                              setIsOpen(true)
                              setUpdateUser(user)
                             }
                            
                            }/>
                             <DeleteIcon sx={{cursor:"pointer" ,color:"red"}} onClick={async ()=>{
                                  //     console.log("clicked user id", user._id)
                                  Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You won't be able to revert this!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!'
                                  }).then(async (result) => {
                                    if (result.isConfirmed) {
                                      let result=   await deleteUserRequest({_id:user._id});
                                          dispatch(deleteUser())
                                      
                                      Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                      )
                                      let {data} = await getAllUsers();
                                      //   console.log("reducer result" , data)
                                        dispatch(success(data))
                              
                                    }
                                  })
                                
                                  
                                   
                             }}/>
                          </Stack>
                         </TableCell>
                    </TableRow>
                  )
                })
               }
            </TableBody>
          </Table>

         </TableContainer>
     </Box>
      <EditUserInfo isOpen={isOpen} handleClose={handleClose} updateUser={updateUser}/>
    </>
  );
}
