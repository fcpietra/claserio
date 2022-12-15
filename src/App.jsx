import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Register from './pages/ClassRegister';
import Recovery from "./pages/Recovery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PendingClasses from "./pages/PendingClasses";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import ClassInfo from "./pages/ClassInfo";
import Contract from "./pages/Contract";
import CurrentClasses from "./pages/CurrentClasses";
import ClassEditor from "./pages/ClassEditor";
import RequestedComments from "./pages/RequestedComments";
import RequestedClasses from "./pages/RequestedClasses";
import AcceptedClasses from "./pages/AcceptedClasses";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
      <div className="App">
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/home" element={<Home/>}/>

            <Route path="/login" element={<SingIn/>}/>
            <Route path="/register/user" element={<SingUp/>}/>
            <Route path="/class/edit" element={<ClassEditor/>}/>
            <Route path="/contract" element={<Contract/>}/>

            <Route path="/comments" element={<RequestedComments/>}/>
            <Route path="/requests" element={<RequestedClasses/>}/>
            <Route path="/accepted" element={<AcceptedClasses/>}/>

            <Route path="/register/class" element={<Register registrar="clase"/>}/>
            <Route path="class/pending" element={<PendingClasses/>}/>
            <Route path="class/approved" element={<CurrentClasses/>}/>
            <Route path="/class" element={<ClassInfo/>}/>
            <Route path="/recovery" element={<Recovery/>}/>
            <Route path="/resetpassword" element={<ResetPassword/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
  );
}
export default App;
