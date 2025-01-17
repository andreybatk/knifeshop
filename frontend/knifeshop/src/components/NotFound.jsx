import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main style={{ textAlign: "center", marginTop: "5rem" }}>
            <h1 style={{ fontSize: "4rem", color: "secondary" }}>404</h1>
            <Button type="submit" variant="contained" color="primary" onClick={() => navigate("/")}>
                Вернуться на главную
                </Button>
        </main>
    );
}
