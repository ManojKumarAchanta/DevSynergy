import React from 'react';
import { Routes, Route} from "react-router-dom"
import AuthTabs from "./pages/AuthTabs";
import UpdatePassword from './pages/UpdatePassword';

const App = () => {
  return (
    <Routes>
        <Route path="*" element={<AuthTabs />} />
        <Route path="/auth" element={<AuthTabs />} />
        <Route path='/update-password' element={<UpdatePassword/>}/>
    </Routes>
  );
};

export default App;
