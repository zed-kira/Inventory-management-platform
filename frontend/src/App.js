import { useState } from 'react';
import { Divider } from '@mui/material';
import './App.css';


import ProSidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import Inventory from './scenes/inventory';

import CssBaseline from '@mui/material/CssBaseline';

import { useProSidebar } from 'react-pro-sidebar';

// Make sure it's the last one when importing other CSS
import '@tremor/react/dist/esm/tremor.css';

import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <CssBaseline />
      <div className='app'>
        <ProSidebar />
        <div className='content'>
          <Topbar />
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
