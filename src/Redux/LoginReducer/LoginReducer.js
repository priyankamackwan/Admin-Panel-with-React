import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from "./LoginConstans"

const initialState={
    isLogged:false,
    user:{},
    error:false
}
 export const  LoginReducer=(store=initialState,{type,payload})=>{
              switch(type){
                case LOGIN_LOADING:  return {...store,loading:true}
                case LOGIN_ERROR: return {...store,error:true,loading:false}
                case LOGIN_SUCCESS: return {...store, error:false,loading:false,isLogged:true,user:payload}
                case LOGOUT: return initialState
                default : return store
              }
}