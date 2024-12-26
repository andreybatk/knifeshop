import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Auth/AuthUtils";
import { API_URL_KNIFES } from '../../config';

export default function AdminPanel() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        price: 0,
        isOnSale: false,
        mainImage: null,
        secondaryImages: []
    });
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
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            if (name === "mainImage") {
                setFormData({ ...formData, mainImage: files[0] });
            } else if (name === "secondaryImages") {
                setFormData({ ...formData, secondaryImages: Array.from(files) });
            }
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
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
        if (formData.mainImage) data.append("image", formData.mainImage);
        formData.secondaryImages.forEach((file) => data.append("images", file));

        try {
            const response = await axios.post(API_URL_KNIFES, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Knife created:", response.data);
            alert("Нож успешно создан!");
            navigate("/admin");
        } catch (error) {
            console.error("Error creating knife:", error);
            alert("Ошибка при создании ножа!");
        }
    };

    return (
        <main className="container">
            <div className="admin-panel">
                <h1>Создание ножа</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Название"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Категория"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Описание"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Цена"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        Есть в наличии:
                        <input
                            type="checkbox"
                            name="isOnSale"
                            checked={formData.isOnSale}
                            onChange={handleChange}
                        />
                    </label>
                    <input
                        type="file"
                        name="mainImage"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="file"
                        name="secondaryImages"
                        onChange={handleChange}
                        multiple
                    />
                    <button type="submit">Добавить товар</button>
                </form>
            </div>
        </main>
    );
}
