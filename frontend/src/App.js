import { Divider } from '@mui/material';
import './App.css';

import ProSidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';

import CssBaseline from '@mui/material/CssBaseline';

// Make sure it's the last one when importing other CSS
import '@tremor/react/dist/esm/tremor.css';


function App() {
  return (
    <>
      <CssBaseline />
      <div id="app" style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
        <ProSidebar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
