import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Импортируем Slider из react-slick
import { API, API_URL_KNIFES_ON_SALE } from './config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function Carousell(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Получаем функцию для навигации

    const fetchKnives = async () => {
        try {
            const response = await axios.get(API_URL_KNIFES_ON_SALE, {
                params: {
                    Search: '', // Если нужно передать текст для поиска
                    SortItem: 'price', // Сортировка по цене
                    SortOrder: 'asc', // Порядок сортировки (asc или desc)
                },
            });

            // Ограничиваем количество ножей до 5 для карусели
            const knives = response.data.slice(0, 6); // Берем только первые 6 ножей
            setItems(knives);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching knives:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKnives(); // Загружаем ножи при монтировании компонента
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const settings = {
        infinite: true,
        centerMode: true,
        centerPadding: '0', // Убираем отступы
        slidesToShow: 3, // Показывать 3 элемента на экране
        speed: 500,
        focusOnSelect: true,
        autoplay: true, // Включаем автопрокрутку
        autoplaySpeed: 3500, // Интервал автопрокрутки (в миллисекундах)
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // На мобильных устройствах показываем 1 элемент
                    centerMode: true,
                    centerPadding: '40px',
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {items.map((item) => (
                <Item 
                    key={item.id} 
                    id={item.id} 
                    title={item.title} 
                    price={item.price} 
                    image={item.image} 
                    navigate={navigate} // Передаем функцию navigate
                />
            ))}
        </Slider>
    );
}

const defaultImage = "/default-knife.jpg";

const Item = ({ id, title, price, image, navigate }) => {
    // Функция для обработки клика и перехода на страницу с подробностями
    const handleDetailsClick = () => {
        navigate(`/knifes/${id}`); // Переход по пути с id ножа
    };

    return (
        <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardActionArea onClick={handleDetailsClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${API}${image}`}
                    alt={title}
                    onError={(e) => { e.target.src = defaultImage; }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Carousell;
