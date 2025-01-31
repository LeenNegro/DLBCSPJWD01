import React from 'react'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SideBar from './components/SideBar/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import TrackOrder from './pages/TrackOrder/TrackOrder' // Import the TrackOrder page
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='App'>
      <ToastContainer />
      <NavigationBar />
      <hr />
      <div className='AppContent'>
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track-order" element={<TrackOrder />} /> {/* Add the route here */}
        </Routes>
      </div>
    </div>
  )
}

export default App
