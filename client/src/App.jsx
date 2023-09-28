import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//import { DriverRegistration, LandingPage, HomePage, DetailPage, Nav , NationalityRegister} from "./components/index";
import DriverRegistration from "./components/NewDriver/DriverRegistration.jsx";
import LandingPage from "./components/LandingPage/LandigPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import DetailPage from "./components/DetailPage/DetailPage.jsx";
import Nav from "./components/NavBar/Nav.jsx";
import NationalityRegister from "./components/NewNationality/NationalityRegister.jsx";
import './App.css';

function App() {
  const navigate = useNavigate();

  // Redirige a la página principal ("/") al recargar la página
  useEffect(() => {
      navigate('/');
  }, []);

  return (
    <>
      <div className='app'>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<DriverRegistration />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/nation' element={<NationalityRegister />} />
        </Routes>
      </div>
    </>
  )
}

export default App;