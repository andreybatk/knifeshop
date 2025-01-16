import React from 'react';
import ReactDOM from 'react-dom/client';  // Используем новый импорт
import './index.css';
import App from './App';

// Создаем корневой элемент для рендеринга
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение внутри корневого элемента
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
