import React from "react";
import Results from './Results';
import Voting from './VotingB';
import AdminPanel from './AdminPanelB';
import OpenB from './OpenB';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OpenB/>} />
        <Route path='/AdminPanel' element={<AdminPanel/>} />
        <Route path='/Voting' element={<Voting />} />
        <Route path='/Results' element={<Results/>} />
      </Routes>
  </BrowserRouter>
  );
}
export default App;




















































