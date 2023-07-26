import axios from "axios";

// ** All users api handler
const BASE_URL= process.env.REACT_APP_API_URL;
export const getAllUsers= async()=>{
      return axios.get(`${BASE_URL}/users`)
}
// create new user handler
export const createUserHandler= async(user)=>{
           return axios.post(`${BASE_URL}/users` , user ,{headers:{
            "Content-Type": "multipart/form-data"
          }})
}

// delete user handler 
export const deleteUserRequest= async ({_id})=>{
    return  await axios.delete(`${BASE_URL}/users/${_id}` )
}

// update user handler with profile photo
export const updateUserHanlder= async( updatedRecord)=>{
    return await axios.patch(`${BASE_URL}/users/profile` ,updatedRecord ,{headers:{
        "Content-Type": "multipart/form-data"
      }});
}

// update user handler without profile photo
export const updateUserHanlder2= async( updatedRecord)=>{
    return await axios.patch(`${BASE_URL}/users` ,updatedRecord );
}
// search information handler
 export const searchHanlder= async(str)=>{
    return await axios.get(`${BASE_URL}/users?search=${str}`)
}

// login hanlder 
export const loginServiceRequest= async(data)=>{
    return await axios.post(`${BASE_URL}/admin/login`,data)
}