import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Register from './pages/RegisterForm';
import Recovery from "./pages/Recovery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PendingClasses from "./pages/PendingClasses";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import ClassInfo from "./pages/ClassInfo";
import Contract from "./pages/Contract";
import CurrentClasses from "./pages/CurrentClasses";

function App() {
  return (
      <div className="App">
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/home" element={<Home/>}/>

            <Route path="/login" element={<SingIn/>}/>
            <Route path="/register/user" element={<SingUp/>}/>

            <Route path="/contract" element={<Contract/>}/>
            <Route path="/register/class" element={<Register registrar="clase"/>}/>
            <Route path="class/pending" element={<PendingClasses/>}/>
            <Route path="class/approved" element={<CurrentClasses/>}/>
            <Route path="/class" element={<ClassInfo/>}/>
            <Route path="/profile" element={<Recovery/>}/>
            <Route path="/recovery" element={<Recovery/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
  );
}
export default App;
