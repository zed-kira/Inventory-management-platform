import React from "react";

import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';

import { Footer } from "@tremor/react";

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AssessmentIcon from '@mui/icons-material/Assessment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

import EventIcon from '@mui/icons-material/Event';

import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import '../Sidebar/index.css';

import Avatar from '@mui/material/Avatar';
import userAvatar from "../../../assets/images/customer-2.jpg";


const ProSidebar = () => {
    
    return (
        
        <Sidebar breakPoint="sm" id="sidebar" transitionDuration={1000}> {/* backgroundColor="#0C2D48" style={{ height: "100vh" }} */} 
            <Menu>
                <Menu style={{ marginTop: 10, marginLeft: 5}}>
                    <MenuItem id="logoMenuItem" icon={<img src={logo} id="sidebar_logo" alt='LOGO' />}><h4 style={{ marginLeft: 10, marginTop: 7}}>Zedkira</h4> </MenuItem> {/* <AppleIcon /> style={{ textAlign: "center" }} */}
                </Menu>
                

                <Menu 
                    style={{ marginTop: 10}}
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
                        component={<Link to="/calendar" />} 
                        icon={<EventIcon color="primary" />}
                    > 
                        Calendar 
                    </MenuItem>

                    <MenuItem 
                        component={<Link to="/integrations" />} 
                        icon={<IntegrationInstructionsIcon color="primary" />}
                    > 
                        Integrations 
                    </MenuItem>

                </Menu>

                <Footer
                    height="h-20"
                    >
                        <div className="d-flex justify-content-start align-items-center">
                            <Avatar alt="Avatar" src={userAvatar} />
                            <div style={{ marginLeft: 20 }}>
                                First User
                            </div>
                        </div>
                </Footer>

            </Menu>
        </Sidebar>
    );
};

export default ProSidebar;
