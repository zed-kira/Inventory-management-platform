import React from "react";

import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import AppleIcon from '@mui/icons-material/Apple';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

import { Box, Divider } from "@mui/material";


const ProSidebar = () => {
    
    return (
        
        <Sidebar style={{ height: "100vh" }} transitionDuration={1000}> {/* backgroundColor="#bee2ff" */} 
            <Menu>
                <Menu style={{ marginTop: '10px'}}>
                    <MenuItem icon={<AppleIcon />}> <h2>Zedkira</h2> </MenuItem> {/* style={{ textAlign: "center" }} */}
                </Menu>
                <Divider />
                
                <Menu
                    style={{ marginTop: '20px'}}
                > 
                    <MenuItem icon={<DashboardCustomizeIcon color="primary" />}> Dashboard </MenuItem>
                    <SubMenu icon={<AccessAlarmIcon color="primary" />} label="Charts">
                        <MenuItem> Pie charts</MenuItem>
                        <MenuItem> Line charts</MenuItem>
                        <MenuItem> Bar charts</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<ThreeDRotation color="primary" />} label="Maps">
                        <MenuItem> Google maps</MenuItem>
                        <MenuItem> Open street maps</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<ThreeDRotation color="primary" />} label="Theme">
                        <MenuItem> Dark</MenuItem>
                        <MenuItem> Light</MenuItem>
                    </SubMenu>
                </Menu>
            </Menu>
        </Sidebar>
    );
};

export default ProSidebar;
