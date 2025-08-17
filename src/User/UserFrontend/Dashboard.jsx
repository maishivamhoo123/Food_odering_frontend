import React from 'react'
import Navbar from './NavBar/Navbar'
import HeroSection from './HeroSection/Hero'
import FoodList from './BelowHero/Dishes'
import RestaurantList from './Restaurant/RestaurantList'
import Footer from './Restaurant/Footer/Footer'

const Dashboard = () => {
  return (
    <div>
 <Navbar/>
 <HeroSection/>
 <FoodList/>
 <RestaurantList/>
 <Footer/>
    </div>
  )
}

export default Dashboard
