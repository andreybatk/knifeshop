import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_KNIFES} from "../../config";
import { checkAdmin } from "../Auth/AuthUtils";
import { Checkbox } from "@mui/material";
import { Box, Button, Typography, Paper } from "@mui/material";

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
                    image: null,
                    images: [],
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

    const handleFileDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
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
            images: [...prev.images, ...Array.from(e.target.files)],
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

    const handleBoxClick = () => {
        document.getElementById('fileInput').click();
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
                <Box mb={3}>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={3}>
                    <label>Категория:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={3}>
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                 </Box>
                <Box mb={3}>
                    <label>Цена:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={3}>
                    <label>В наличии:</label>
                    <Checkbox
                        type="checkbox"
                        name="isOnSale"
                        checked={formData.isOnSale}
                        onChange={handleChange}
                    />
                </Box>

                <Box mb={3}>
                    <label>Главное изображение:</label>
                    <input type="file" onChange={handleImageChange} />
                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            style={{ width: "200px", height: "auto", marginTop: "10px" }}
                        />
                    )}
                </Box>

                <Box
                    component={Paper}
                    elevation={2}
                    onClick={handleBoxClick}
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    sx={{
                        p: 2,
                        textAlign: "center",
                        border: "2px dashed #ccc",
                        mb: 3,
                        backgroundColor: "#fafafa",
                        cursor: "pointer",
                    }}
                >
                    <Typography>Дополнительные изображения</Typography>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        onChange={handleImagesChange}
                        hidden
                    />
                </Box>

                <Box mb={3} display="flex" gap={2} flexWrap="wrap">
                    {formData.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={URL.createObjectURL(img)}
                            alt={`Image ${idx}`}
                            style={{ width: "100px", height: "auto" }}
                        />
                    ))}
                </Box>

                <Box mb={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Сохранить изменения
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                        sx={{ ml: 2 }}
                    >
                        Удалить нож
                    </Button>
                </Box>
            </form>
        </main>
    );
}
