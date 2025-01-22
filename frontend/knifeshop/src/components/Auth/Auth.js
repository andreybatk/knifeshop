
import { Box, Typography } from "@mui/material";
import GoogleAuthButton from "./GoogleAuthButton";

export default function Auth() {
    return (
        <main className="container">
            <Box sx={{ padding: 4 }}>
            <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Авторизация
                </Typography>
                <GoogleAuthButton/>
            </Box>
        </main>
    );
}