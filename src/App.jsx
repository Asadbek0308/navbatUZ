import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Asadbek/Home'
import MyTurn from './pages/Asadbek/MyTurn'
import Registration from './pages/Asadbek/Registration'
import StationOwner from './pages/Asadbek/StationOwner'
import Map from './pages/Bexruz/Map'
import Rating from './pages/Bexruz/Rating'
import StationDetail from './pages/Bexruz/StationDetail'
import UserProfile from './pages/Bexruz/UserProfile'

const App = () => {
  return (
    <div className='bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-turn' element={<MyTurn />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/station-owner' element={<StationOwner />} />
        <Route path='/map' element={<Map />} />
        <Route path='/rating' element={<Rating />} />
        <Route path='/station-detail' element={<StationDetail />} />
        <Route path='/user-profile' element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
