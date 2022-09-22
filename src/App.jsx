import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Footer from './components/Footer';
import HeaderMUI from './components/HeaderMUI';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/RegisterForm';
import Class from './components/Class';

function App() {
  return (
      <div className="App">
        <HeaderMUI/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
            <Route path="/class" element={<Class/>}/>
          <Route path="*" element={<h1>404: Not Found</h1>}/>
        </Routes>
        <Footer/>
      </div>
  );
}
export default App;
