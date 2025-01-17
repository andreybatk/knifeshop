import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_KNIFES} from "../../config";
import { checkAdmin } from "../Auth/AuthUtils";
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Typography, Paper, Checkbox } from "@mui/material";

export default function KnifeEdit() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        Title: "",
        Category: "",
        Description: "",
        Price: "",
        IsOnSale: true,
        Image: null,
        Images: [],
        OverallLength: "",
        BladeLength: "",
        ButtThickness: "",
        Weight: "",
        HandleMaterial: "",
        Country: "",
        Manufacturer: "",
        SteelGrade: "",
    });

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
            Images: [...prev.Images, ...files],
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            Image: e.target.files[0],
        }));
    };

    const handleImagesChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            Images: [...prev.Images, ...Array.from(e.target.files)],
        }));
    };

    const handleBoxClick = () => {
        document.getElementById('fileInput').click();
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Title", formData.Title);
        data.append("Category", formData.Category);
        data.append("Description", formData.Description);
        data.append("Price", formData.Price);
        data.append("IsOnSale", formData.IsOnSale);
        if (formData.Image) data.append("Image", formData.Image);
        formData.Images.forEach((Image) => data.append("Images", Image));
        data.append("OverallLength", formData.OverallLength);
        data.append("BladeLength", formData.BladeLength);
        data.append("ButtThickness", formData.ButtThickness);
        data.append("Weight", formData.Weight);
        data.append("HandleMaterial", formData.HandleMaterial);
        data.append("Country", formData.Country);
        data.append("Manufacturer", formData.Manufacturer);
        data.append("SteelGrade", formData.SteelGrade);

        try {
            const response = await axios.post(API_URL_KNIFES, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const knifeId = response.data;
            alert("Нож успешно добавлен!");
            navigate(`/knifes/${knifeId}`);
        } catch (error) {
            if (error.response && error.response.data) {
                // Обработка ошибок валидации
                setErrors(error.response.data); // Сохраняем ошибки в состоянии
            } else {
                console.error("Ошибка при добавлении ножа:", error);
                alert("Не удалось добавить нож!");
            }
        }
    };

    return (
        <main className="container">
            <h1>Создание ножа</h1>
            <form onSubmit={handleSubmit}>
                <Box mb={3}>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        
                    />
                    {errors.Title && <Typography color="error">{errors.Title}</Typography>}
                </Box>
                <Box mb={3}>
                    <label>Категория:</label>
                    <input
                        type="text"
                        name="Category"
                        value={formData.Category}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={3}>
                    <label>Описание:</label>
                    <textarea
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                    />
                 </Box>
                <Box mb={3}>
                    <label>Цена:</label>
                    <input
                        type="number"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={3}>
                    <label>В наличии:</label>
                    <Checkbox
                        type="checkbox"
                        name="IsOnSale"
                        checked={formData.IsOnSale}
                        onChange={handleChange}
                    />
                </Box>

                <Box mb={3}>
                    <Accordion>
                        <AccordionSummary>
                            <Typography variant="h6">Характеристики</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Box mb={3}>
                                    <label>Длина ножа (мм):</label>
                                    <input
                                        name="OverallLength"
                                        type="number"
                                        value={formData.OverallLength}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Длина лезвия (мм):</label>
                                    <input
                                        name="BladeLength"
                                        type="number"
                                        value={formData.BladeLength}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Толщина обуха (мм):</label>
                                    <input
                                        name="ButtThickness"
                                        type="number"
                                        value={formData.ButtThickness}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Вес (г):</label>
                                    <input
                                        name="Weight"
                                        type="number"
                                        value={formData.Weight}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Материал рукояти:</label>
                                    <input
                                        name="HandleMaterial"
                                        type="text"
                                        value={formData.HandleMaterial}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Страна производитель:</label>
                                    <input
                                        name="Country"
                                        type="text"
                                        value={formData.Country}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Производитель:</label>
                                    <input
                                        name="Manufacturer"
                                        type="text"
                                        value={formData.Manufacturer}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box mb={3}>
                                    <label>Марка стали:</label>
                                    <input
                                        name="SteelGrade"
                                        type="text"
                                        value={formData.SteelGrade}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Box mb={3}>
                    <label>Главное изображение:</label>
                    <input type="file" onChange={handleImageChange} />
                    {formData.Image && (
                        <img
                            src={URL.createObjectURL(formData.Image)}
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
                    {formData.Images.map((img, idx) => (
                        <img
                            key={idx}
                            src={URL.createObjectURL(img)}
                            alt="Preview"
                            style={{ width: "100px", height: "auto" }}
                        />
                    ))}
                </Box>

                <Box mb={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Создать нож
                    </Button>
                </Box>
            </form>
        </main>
    );
}
