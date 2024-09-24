import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Campaign from './pages/CampaignList';
import Overview from './pages/Overview';
import CreateList from './pages/CreateList';
import UpdateList from './pages/UpdateList';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
       
          <NavBar />
          </div>
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/campaignlist" element={<Campaign />} />
              <Route path="/create-list" element={<CreateList/>} />
              <Route path="/update-list/:id" element={<UpdateList/>} />
              
            </Routes>
         
        </div>
      
    </BrowserRouter>
  );
}

export default App;
