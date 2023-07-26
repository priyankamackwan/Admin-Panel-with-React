import React from 'react'

import {Routes,Route ,Outlet} from "react-router-dom"
import AddUser from '../components/AddUser'
import Home from '../components/Home'
import Login from '../components/Login'
import PrivateRoute from './PrivateRoute'
export default function AllRoutes() {

  return (
    <>
    <Routes>
      <Route element={<PrivateRoute/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<AddUser/>}/>
      </Route>
     
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
