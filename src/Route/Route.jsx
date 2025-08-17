import React from 'react'
import { Routes, Route } from "react-router-dom";
import OwnerLogin from "../pages/login/OwnerLogin";
import OwnerSignup from "../pages/signUp/OwnerSignUp"
import FrontPage from "../pages/useFull/FrontPage"
import DashBoard from '../OwnerDashBoard/DashBoard';
import SignUp from '../DeliveryPartner/signUp';
import Login from '../DeliveryPartner/login';
import Dashboard from '../DeliveryPartner/DashBoard';
import Signup from '../User/UserCredantials/signup';
import LoginUser from "../User/UserCredantials/Login"
import DashboardUser from "../User/UserFrontend/Dashboard"
import RestaurantList from "../User/UserFrontend/Restaurant/RestaurantList";
import RestaurantFoods from "../User/UserFrontend/Restaurant/RestaurantFoods"


const AppRoute = () => {
  return (
    <Routes>
        <Route path="/"  element ={<FrontPage/>}/>
        <Route path= "/userSignIn"  element ={<LoginUser/>}/>
<Route path= "/userSignUP"  element ={<Signup/>}/>
<Route path= "/ownerLogin"  element ={<OwnerLogin/>}/>
<Route path= "/user-dashboard"  element ={<DashboardUser/>}/>
<Route path ="/ownerSignup"  element ={<OwnerSignup/>}/>
<Route path='/ownerDashboard' element = {<DashBoard/>}/>

<Route path='/partnerSignUp' element = {<SignUp/>}/>
<Route path='/partnerlogin' element = {<Login/>}/>
<Route path="/partner-dashboard" element={<Dashboard/>} />
<Route path="/restaurants" element={<RestaurantList />} />
<Route path="/restaurant/:id" element={<RestaurantFoods />} />

  </Routes>
  )
}

export default AppRoute
