import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_KNIFES, API } from "../../config";
import { checkAdmin } from "../Auth/AuthUtils";

export default function KnifeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        isOnSale: false,
        image: null,
        images: [],
    });

    const [currentImages, setCurrentImages] = useState({
        image: "",
        images: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKnife = async () => {
            try {
                const response = await axios.get(`${API_URL_KNIFES}/${id}`);
                const knife = response.data;
                setFormData({
                    title: knife.title,
                    category: knife.category,
                    description: knife.description,
                    price: knife.price,
                    isOnSale: knife.isOnSale,
                    image: null, // Оставляем пустым для загрузки нового
                    images: [],
                });
                setCurrentImages({
                    image: knife.image,
                    images: knife.images || [],
                });
                setLoading(false);
            } catch (err) {
                console.error("Ошибка загрузки данных ножа:", err);
                setError("Не удалось загрузить данные ножа");
                setLoading(false);
            }
        };

        fetchKnife();
    }, [id]);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            const isAdmin = await checkAdmin();
            setIsAdmin(isAdmin);
        };

        fetchRole();
    }, []);

    if (!isAdmin) {
        return <p>Доступ запрещен: только для администраторов.</p>;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleImagesChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(e.target.files),
        }));
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот нож?");
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`${API_URL_KNIFES}/${id}`);
            alert("Нож успешно удален!");
            navigate("/"); // Перенаправляем на страницу со списком ножей
        } catch (err) {
            console.error("Ошибка при удалении ножа:", err);
            alert("Не удалось удалить нож.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("isOnSale", formData.isOnSale);
        if (formData.image) data.append("Image", formData.image);
        formData.images.forEach((image) => data.append("Images", image));

        try {
            await axios.post(`${API_URL_KNIFES}/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Нож успешно обновлен!");
            navigate(`/knifes/${id}`);
        } catch (err) {
            console.error("Ошибка при редактировании ножа:", err);
            alert("Не удалось обновить нож.");
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    const defaultImage = "/default-knife.jpg";

    return (
        <main className="container">
            <h1>Редактирование ножа</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Категория:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Цена:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>
                        В наличии:
                        <input
                            type="checkbox"
                            name="isOnSale"
                            checked={formData.isOnSale}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Текущее главное изображение:</label>
                    {currentImages.image && (
                        <img
                            src={`${API}${currentImages.image}`}
                            alt="Главное изображение"
                            style={ { width: "200px", height: "auto" } }
                            onError={(e) => { e.target.src = defaultImage; } }
                        />
                    )}
                </div>
                <div>
                    <label>Главное изображение:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <div>
                    <label>Текущие дополнительные изображения:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {currentImages.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={`${API}${img}`}
                                alt={`Дополнительное изображение ${idx + 1}`}
                                style={{ width: "100px", height: "auto" }}
                                onError={(e) => { e.target.src = defaultImage; } }
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label>Дополнительные изображения:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImagesChange}
                    />
                </div>
                <div className="button-group" style={{ marginTop: '20px' }}>
                    <button type="submit" className="btn blue darken-5" style={{ marginRight: '10px' }}>
                        Сохранить изменения
                    </button>
                    <button
                        type="button"
                        className="btn red"
                        onClick={handleDelete}
                    >
                        Удалить нож
                    </button>
                </div>
            </form>
        </main>
    );
}
