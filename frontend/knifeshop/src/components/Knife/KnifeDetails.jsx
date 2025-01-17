import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Button, Card, CardActions, CardMedia, CardContent, Typography, Grid2, Box, ImageList, ImageListItem, Chip, Stack, Divider, Tooltip, Rating } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Auth/AuthUtils";
import Preloader from "../Preloader";
import { API_URL_KNIFES, API, TELEGRAM_BUY } from "../../config";

export default function KnifeDetails() {
    const { id } = useParams();
    const [knife, setKnife] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const defaultImage = "/default-knife.jpg";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRole = async () => {
            const isAdmin = await checkAdmin();
            setIsAdmin(isAdmin);
        };
        fetchRole();
    }, []);

    useEffect(() => {
        const fetchKnife = async () => {
            try {
                const response = await axios.get(`${API_URL_KNIFES}/${id}`);
                setKnife(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Нож не найден:", error);
                    navigate("/404");
                } else {
                    console.error("Ошибка загрузки данных ножа:", error);
                }
            }
        };
        fetchKnife();
    }, [id]);

    const handleEditClick = () => navigate(`/knifes/${id}/edit`);
    const handleBuyClick = () => window.location.href = TELEGRAM_BUY;

    if (!knife) return <Preloader />;

    return (
        <main className="container">
            <Box sx={{ padding: 4 }}>
                <Card sx={{ maxWidth: 1200, margin: "0 auto", boxShadow: 4 }}>
                    <Grid2 container spacing={3}>
                        {/* Левая часть с изображением */}
                        <Grid2 item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                sx={{ objectFit: "contain", borderRadius: 2 }}
                                height="400"
                                image={`${API}${knife.image}`}
                                alt={knife.title}
                                onError={(e) => (e.target.src = defaultImage)}
                            />
                            {knife.images && knife.images.length > 0 && (
                                <Box sx={{ marginTop: 2 }}>
                                    <ImageList sx={{ width: "100%", height: 100 }} cols={4} rowHeight={100}>
                                        {knife.images.map((img, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={`${API}${img}`}
                                                    alt={`Image ${index + 1}`}
                                                    loading="lazy"
                                                    onError={(e) => (e.target.src = defaultImage)}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Box>
                            )}
                        </Grid2>
                        
                        <Grid2 item xs={12} md={6}>
                            <CardContent>
                                <Stack spacing={1}>
                                    <Chip label={knife.isOnSale ? "В наличии" : "Нет в наличии"} color = {knife.isOnSale ? "success" : "error"} sx={{ fontSize: 12, alignSelf: "flex-start" }} />
                                    <Typography variant="h4" fontWeight="bold" gutterBottom>{knife.title}</Typography>
                                    <Rating value = "5" readOnly size="small" />
                                    <Typography variant="h6" color="primary" gutterBottom>Цена: {knife.price} руб.</Typography>
                                    <Typography variant="body1">Категория: {knife.category}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>{knife.description}</Typography>
                                    <Divider />
                                    <Typography variant="body2" color="text.secondary">Добавлено: {new Date(knife.createdAt).toLocaleDateString()}</Typography>
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Tooltip title="Перейти к покупке">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleBuyClick}
                                        disabled={!knife.isOnSale}
                                    >
                                        Купить
                                    </Button>
                                </Tooltip>
                                {isAdmin && (
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={handleEditClick}
                                    >
                                        Редактировать
                                    </Button>
                                )}
                            </CardActions>
                        </Grid2>
                    </Grid2>
                    
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Характеристики</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">
                                {knife.knifesInfo.overallLength && (
                                    <>Длина ножа: {knife.knifesInfo.overallLength} мм<br /></>
                                )}
                                {knife.knifesInfo.bladeLength && (
                                    <>Длина лезвия: {knife.knifesInfo.bladeLength} мм<br /></>
                                )}
                                {knife.knifesInfo.buttThickness && (
                                    <>Толщина обуха: {knife.knifesInfo.buttThickness} мм<br /></>
                                )}
                                {knife.knifesInfo.weight && (
                                    <>Вес: {knife.knifesInfo.weight} г<br /></>
                                )}
                                {knife.knifesInfo.handleMaterial && (
                                    <>Материал рукояти: {knife.knifesInfo.handleMaterial}<br /></>
                                )}
                                {knife.knifesInfo.country && (
                                    <>Страна производитель: {knife.knifesInfo.country}<br /></>
                                )}
                                {knife.knifesInfo.manufacturer && (
                                    <>Производитель: {knife.knifesInfo.manufacturer}<br /></>
                                )}
                                {knife.knifesInfo.steelGrade && (
                                    <>Марка стали: {knife.knifesInfo.steelGrade}<br /></>
                                )}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            </Box>
        </main>
    );
}
