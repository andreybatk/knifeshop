import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Telegram from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import { AppBar, Toolbar, Box } from '@mui/material';
import { TELEGRAM_BUY } from '../config';

export default function Footer() {
    const handleTelegramClick = () => {
        window.location.href = TELEGRAM_BUY;
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <BottomNavigation style={{ backgroundColor: "transparent" }}>
                        <BottomNavigationAction 
                            label="Telegram" 
                            icon={<Telegram style={{ color: "white" }} />} 
                            onClick={handleTelegramClick} // Переход по ссылке
                        />
                        <BottomNavigationAction 
                            label="Instagram" 
                            icon={<InstagramIcon style={{ color: "white" }} />} 
                        />
                    </BottomNavigation>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
