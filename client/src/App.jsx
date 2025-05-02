import React from 'react';
import Login from './pages/login/Login'; 
import { Routes, Route} from "react-router-dom"
import Signup from './pages/signup/Signup';

const App = () => {
  return (
    <Routes>
        <Route path='*' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
  );
};

export default App;
