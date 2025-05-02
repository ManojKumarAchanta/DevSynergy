import React from 'react';
import { Routes, Route} from "react-router-dom"
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
