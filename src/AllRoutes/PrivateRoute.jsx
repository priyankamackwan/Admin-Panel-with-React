import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../components/Login';
export default function PrivateRoute() {
    const store= useSelector((store)=>store.LoginReducer);
    // console.log("login store",store)
  return (
           store.isLogged?<Outlet/>:<Navigate to={'/login'}/>
  )
}
