import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_KNIFES } from "../../config";
import { API } from "../../config";

export default function KnifeDetails() {
    const { id } = useParams();
    const [knife, setKnife] = useState(null);

    const defaultImage = "/default-knife.jpg";

    useEffect(() => {
        const fetchKnife = async () => {
            try {
                const response = await axios.get(`${API_URL_KNIFES}/${id}`);
                setKnife(response.data);
            } catch (error) {
                console.error("Ошибка загрузки данных ножа:", error);
            }
        };

        fetchKnife();
    }, [id]);

    if (!knife) {
        return <p>Загрузка...</p>;
    }

    return (
        <main className="container">
            <h1>{knife.title}</h1>
            <img 
                src={`${API}${knife.image}`} 
                alt={knife.title} 
                onError={(e) => { e.target.src = defaultImage; }}
            />
            <p>Категория: {knife.category}</p>
            <p>Описание: {knife.description}</p>
            <p>Цена: {knife.price} руб.</p>
            <p>{knife.isOnSale ? "Есть в наличии" : "Нет в наличии"}</p>
            <p>Добавлено: {new Date(knife.createdAt).toLocaleDateString()}</p>
        </main>
    );
}
