import React, { useState, useContext } from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import LogInPopUp from './components/LogInPop-Up/LogInPopUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import SubmitOrder from './pages/SubmitOrder/SubmitOrder';
import MyOrder from './pages/MyOrder/MyOrder';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import { StoreContext } from './Context/StoreContext';

const App = () => {
  const { token } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LogInPopUp setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <NavigationBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/submitorder' element={<SubmitOrder />} />
          <Route path='/myorders' element={<MyOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/track-order' element={<TrackOrder />} />
          <Route path='/login' element={<LogInPopUp />} /> {/* Add the login route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
