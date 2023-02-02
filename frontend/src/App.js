import './App.css';

import ProSidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import Inventory from './scenes/inventory';
import Integrations from './scenes/integrations';
import Expenses from './scenes/purchases/expenses';
import Vendors from './scenes/purchases/vendors';
import Orders from './scenes/sales/orders';
import Customers from './scenes/sales/customers';
import Invoices from './scenes/sales/invoices';
import Reports from './scenes/reports';

import ZedFooter from './components/footer/ZedFooter';

/* import Product from './components/products';
import Service from './components/services'; */

import { products } from './scenes/inventory';
import { services } from './scenes/inventory';

import CssBaseline from '@mui/material/CssBaseline';

// Make sure it's the last one when importing other CSS
import '@tremor/react/dist/esm/tremor.css';

import { Routes, Route } from "react-router-dom";
import Calendar from './scenes/calendar';

import { useProSidebar } from 'react-pro-sidebar';


function App() {

  const { collapseSidebar, toggleSidebar, collapsed, broken, toggled } = useProSidebar();

  const handleSidebar = () => {
      broken ? toggleSidebar() : collapseSidebar();
  }

  return (
    <>
      <CssBaseline />
      <div className='app'>
        <ProSidebar />
        <div className='content'>
          <Topbar collapse={handleSidebar} />
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory products={products} services={services} />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/product/create" element={<Product />} />
              <Route path="/service/create" element={<Service />} /> */}
          </Routes>
          <ZedFooter />
        </div>
      </div>
    </>
  );
}

export default App;
