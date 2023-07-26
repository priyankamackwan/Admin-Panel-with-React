import {loginServiceRequest} from "../../Service/api"
import Swal from "sweetalert2"
// *? ACTION CONSTANT
export const LOGIN_LOADING="LOGIN_LOADING"
export const LOGIN_ERROR="LOGIN_ERROR"
export const LOGIN_SUCCESS="LOGIN_SUCCESS"
export const LOGOUT="LOGOUT"

// ** ACTION CREATORS

export const login_loading=()=>({type:LOGIN_LOADING});
export const login_error=()=>({type:LOGIN_ERROR});
export const login_success=(payload)=>({type:LOGIN_SUCCESS,payload});
export const logout=()=>({type:LOGOUT})

// *! LOGIN REQUEST HANDLER 

 export const  loginRequestHandler=(user,navigate)=>async(dispatch)=>{
        dispatch(login_loading());
            try {
                let response= await loginServiceRequest(user);

                // console.log(response)
               if(response.status===200){
                dispatch(login_success(response.data))
                Swal.fire('Logged  Successfully!!' ,'', "success")
                 setTimeout(() => {
                    navigate("/")
                 }, 3000);
               }
              
              
                
            } catch (error) {
                console.log(error)
                dispatch(login_error())
                Swal.fire("Oops?" , 'Please check your email or password',"error")
               
               

            }
    

 }