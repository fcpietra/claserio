import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Footer from './components/Footer';
import HeaderMUI from './components/HeaderMUI';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/RegisterForm';
import Recovery from "./pages/Recovery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <div className="App">
        <HeaderMUI/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
          <Route path="/register/user" element={<Register registrar="usuario"/>}/>
          <Route path="/register/class" element={<Register registrar="clase"/>}/>

            <Route path="/recovery" element={<Recovery/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </div>
  );
}
export default App;
