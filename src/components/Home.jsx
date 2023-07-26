import React, { useState } from "react";
import UserList from "./UserList";
import { AppBar, Button, Pagination, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from "react";
import {useSelector,useDispatch ,} from "react-redux"
import {useNavigate} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import { allUserRequestHandler, searchUser, setPaginatedData } from "../Redux/AllUserRedux/AllUserConstant";
import { getAllUsers, searchHanlder } from "../Service/api";
import { logout } from "../Redux/LoginReducer/LoginConstans";
export function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
export const PAGE_LIMIT=10;
export default function Home() {
  const {allUsers , paginatedData,searchData}= useSelector((store)=>store.AllUserReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch();
 // ** search field input state
 const [searchStr,setSearchStr]=useState("");

 const pageSize=  searchData.length>0?Math.ceil(searchData.length/PAGE_LIMIT):Math.ceil(allUsers.length/PAGE_LIMIT);
  // console.log('allUsers store data',allUsers);
  // console.log("paginated store data",paginatedData)

// *?pagination handler 
 const paginationHandler= (e,value)=>{
        if(value>=1 && value<=PAGE_LIMIT){
           if(searchData.length){
            const paginationResult=paginate(searchData,PAGE_LIMIT,value);
          // console.log("pagination result" , paginationResult);
                dispatch(setPaginatedData(paginationResult))
           }
          else{
            const paginationResult=paginate(allUsers,PAGE_LIMIT,value);
            // console.log("pagination result" , paginationResult);
                  dispatch(setPaginatedData(paginationResult))
          }
        }
  
                   
         
    }
  
  useEffect(()=>{
        dispatch(allUserRequestHandler())
       
      
        
  },[])

  return (
    <>
      {/*  **nav bar */}
      <AppBar>
        <Toolbar sx={{ backgroundColor: "black" }} >
          <Typography>CRUD DEMO</Typography>
     
          <Button variant="contained" type="submit" startIcon={<AddIcon/>} sx={{marginLeft:"auto" , marginRight:"10px"}} onClick={()=>{
            navigate("/add")
          }}>
            Add User
          </Button>
          <Button variant="contained" color='error' onClick={()=>{dispatch(logout())}}>Logout</Button>
    
        </Toolbar>
      </AppBar>
      {/* search box  */}
      <Box sx={{ width: "300px", margin: "auto"  , marginTop:"100px"}}>
        <Stack direction={"row"} spacing={2} sx={{position:"relative"}}>
           <TextField value={searchStr} variant="standard" placeholder="search i.e first or last name, email,phone ,gender" sx={{ width:"90%",height:"30px"}} onChange={(e)=>{
            setSearchStr(e.target.value)
           }}/>
           <Button variant="contained" endIcon={<SearchIcon/>} sx-={{width:"30px" , height:"30px"}}
           onClick={async()=>{
           const searchresult= await  searchHanlder(searchStr);
          //  console.log("searched data" , searchresult.data)
            dispatch(searchUser(searchresult.data));
            setSearchStr('')

           }}
           >
              Search
           </Button> 
        </Stack>
      </Box>

      <UserList  allUsers={paginatedData}/>
       <Box sx={{ maxWidth:"350px",marginLeft:"auto" , marginTop:"10px"}}>
       <Pagination count={pageSize} color="primary" showFirstButton showLastButton onChange={paginationHandler}/>
       </Box>
  
    </>
  );
}
