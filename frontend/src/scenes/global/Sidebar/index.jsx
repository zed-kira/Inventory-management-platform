import React from "react";

import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';

import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';

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

                <Menu style={{ marginTop: '20px'}}>
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
                        <MenuItem> Customers</MenuItem>
                        <MenuItem> Sales Orders</MenuItem>
                        <MenuItem> Invoices</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<LocalMallIcon color="primary" />} label="Purchases">
                        <MenuItem> Vendors</MenuItem>
                        <MenuItem> Expenses</MenuItem>
                    </SubMenu>
                </Menu>
            </Menu>
        </Sidebar>
    );
};

export default ProSidebar;
