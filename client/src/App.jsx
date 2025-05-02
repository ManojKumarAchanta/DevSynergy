import React from 'react';
import Login from './pages/login/Login'; 
import { Routes, Route} from "react-router-dom"
import Signup from './pages/signup/Signup';
import AuthTabs from "./pages/AuthTabs";

const App = () => {
  return (
    <Routes>
        <Route path="*" element={<AuthTabs />} />
        <Route path="/auth" element={<AuthTabs />} />
    </Routes>
  );
};

export default App;
