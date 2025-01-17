import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import CreateKnife from "./components/Admin/CreateKnife";
import KnifeDetails from "./components/Knife/KnifeDetails";
import KnifeEdit from "./components/Knife/KnifeEdit";
import ShopList from "./components/Shop/ShopList";
import NotFound from "./components/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#f50057', // Цвет secondary (замените на ваш)
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent', // Убираем красный фон
          display: 'flex',
          justifyContent: 'center',
        },
        ul: {
          justifyContent: 'center', // Центровка списка страниц
        },
      },
    },
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
          <Route path="/admin" element={<CreateKnife />} />
          <Route path="/knifes/:id" element={<KnifeDetails />} />
          <Route path="/knifes/:id/edit" element={<KnifeEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
