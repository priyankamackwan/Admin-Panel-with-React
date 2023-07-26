import { Pagination } from "@mui/material";
import { getAllUsers } from "../../Service/api";

// *? action constants
export const LOADING="LOADING"
export const ERROR="ERROR"
export const SUCCESS="SUCCESS"
export const DELETE_USER="DELETE_USER"
export const SEARCH_USER="SEARCH_USER"
export const PAGINATION="PAGINATION"
// *?ACTION CREATORS 
export const loading=()=>({type:LOADING});
export const error=()=>({type:ERROR});
export const success=(payload)=>({type:SUCCESS , payload});
export const deleteUser=()=>({type:DELETE_USER });
export const searchUser=(payload)=>({type:SEARCH_USER , payload});
export const setPaginatedData=(payload)=>({type:PAGINATION , payload});

// *? All user request handlers
export const allUserRequestHandler=()=> async(dispatch)=>{
      dispatch(loading());
      try {
          let {data} = await getAllUsers();
        //   console.log("reducer result" , data)
          dispatch(success(data))
      } catch (error) {
           dispatch(error())
      }

}