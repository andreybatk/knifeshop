import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, AppBar, Toolbar, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import Telegram from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import AdminPanel from "./components/Admin/Panel";
import KnifeDetails from "./components/Knife/KnifeDetails";
import KnifeEdit from "./components/Knife/KnifeEdit";
import ShopList from "./components/Shop/ShopList";

// Создаем кастомную тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    }
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/catalog" element={<ShopList />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/knifes/:id" element={<KnifeDetails />} />
          <Route path="/knifes/:id/edit" element={<KnifeEdit />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
