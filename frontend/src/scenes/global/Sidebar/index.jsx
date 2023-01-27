import React from "react";

import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import '../Sidebar/index.css';

import { Divider } from "@mui/material";


const ProSidebar = () => {
    
    return (
        
        <Sidebar id="sidebar" transitionDuration={1000}> {/* backgroundColor="#0C2D48" style={{ height: "100vh" }} */} 
            <Menu>
                <Menu style={{ marginTop: '10px'}}>
                    <MenuItem icon={<img src={logo} id="sidebar_logo" alt='LOGO' />}> <h2>Zedkira</h2> </MenuItem> {/* <AppleIcon /> style={{ textAlign: "center" }} */}
                </Menu>
                <Divider />

                <Menu 
                    style={{ marginTop: '20px'}}
                >
                    <MenuItem 
                        component={<Link to="/" />} 
                        icon={<DashboardCustomizeIcon color="primary" />}
                    > 
                        Dashboard 
                    </MenuItem>

                    <MenuItem 
                        component={<Link to="/inventory" />} 
                        icon={<InventoryIcon color="primary" />}
                    > 
                        Inventory 
                    </MenuItem>
                </Menu>
                
                <Menu
                    style={{ marginTop: '20px'}}
                > 

                    <SubMenu icon={<AddShoppingCartIcon color="primary" />} label="Sales">
                        <MenuItem component={<Link to="/customers" />}> Customers</MenuItem>
                        <MenuItem component={<Link to="/orders" />}> Orders</MenuItem>
                        <MenuItem component={<Link to="/invoices" />}> Invoices</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<LocalMallIcon color="primary" />} label="Purchases">
                        <MenuItem component={<Link to="/vendors" />}> Vendors</MenuItem>
                        <MenuItem component={<Link to="/expenses" />}> Expenses</MenuItem>
                    </SubMenu>
                </Menu>

                <Menu style={{ marginTop: "30px" }}>
                    <MenuItem 
                        component={<Link to="/reports" />} 
                        icon={<AssessmentIcon color="primary" />}
                    > 
                        Reports 
                    </MenuItem>

                    <MenuItem 
                        component={<Link to="/integrations" />} 
                        icon={<IntegrationInstructionsIcon color="primary" />}
                    > 
                        Integrations 
                    </MenuItem>
                    
                    <MenuItem 
                        component={<Link to="/settings" />} 
                        icon={<SettingsIcon color="primary" />}
                    > 
                        Settings 
                    </MenuItem>

                </Menu>

            </Menu>
        </Sidebar>
    );
};

export default ProSidebar;
