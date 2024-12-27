import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAdmin } from "./Auth/AuthUtils";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Header() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            const isAdmin = await checkAdmin();
            setIsAdmin(isAdmin);
        };

        fetchRole();
    }, []);

    return (
        
        <AppBar position="static">
            <Toolbar>
                {/* Используем Box для текста и иконки с флекс-выравниванием */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }} component={Link} to="/" color="inherit" >
                    <Typography variant="h6" >
                        KNIFE SHOP
                    </Typography>
                    <img
                        src="/bowie-knife_39338.ico"
                        style={{ width: 24, marginRight: 8, filter: "invert(1) grayscale(100%)" }}
                    />
                </Box>

                {/* Кнопки выравниваем справа */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button component={Link} to="/catalog" color="inherit">Каталог</Button>
                    {isAdmin && <Button component={Link} to="/admin" color="inherit">Админ панель</Button>}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
