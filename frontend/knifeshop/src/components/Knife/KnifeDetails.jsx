import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_KNIFES, API, TELEGRAM_BUY } from "../../config";
import { Accordion, AccordionSummary, AccordionDetails, Button, Card, CardActions, CardMedia, CardContent, Typography, Grid2, Box, ImageList, ImageListItem, Chip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Auth/AuthUtils";

export default function KnifeDetails() {
    const { id } = useParams();
    const [knife, setKnife] = useState(null);

    const defaultImage = "/default-knife.jpg";
    
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate(`/knifes/${id}/edit`);
    };

    const handleBuyClick = () => {
        window.location.href = TELEGRAM_BUY;
    };

    const [isAdmin, setIsAdmin] = useState(false);

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
        <Box sx={{ padding: 4 }}>
            <Card sx={{ maxWidth: 1200, margin: "0 auto", boxShadow: 3 }}>
                <Grid2 container spacing={2}>
                    {/* Основное изображение */}
                    <Grid2 item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        sx={{ objectFit: "contain" }} // Добавляем objectFit: "contain"
                        height="400"
                        image={`${API}${knife.image}`}
                        alt={knife.title}
                        onError={(e) => {
                            e.target.src = defaultImage;
                        }}
                    />
                </Grid2>
                    {/* Описание ножа */}
                    <Grid2 >
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {knife.title}
                            </Typography>
                            <Chip
                                label={knife.isOnSale ? "Есть в наличии" : "Нет в наличии"}
                                color={knife.isOnSale ? "success" : "error"}
                                sx={{ marginBottom: 2 }}
                            />
                            <Typography variant="body1" color="text.secondary">
                                Категория: {knife.category}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Описание: {knife.description}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Цена: {knife.price} руб.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Добавлено: {new Date(knife.createdAt).toLocaleDateString()}
                            </Typography>
                            <CardActions sx={{ padding: 0, mt: 2 }}> 
                                <Button type="submit" variant="contained" color = "secondary" onClick={handleBuyClick} disabled={!knife.isOnSale}>
                                    Купить
                                </Button>

                                {isAdmin && (
                                    <Button type="submit" variant="outlined" color="success" onClick={handleEditClick}>
                                    Редактировать
                                    </Button>
                                )}
                            </CardActions> 
                        </CardContent>
                    </Grid2>
                </Grid2>

                {knife.images && knife.images.length > 0 && (
                <CardContent>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="gallery-content"
                            id="gallery-header"
                        >
                            <Typography variant="h6" gutterBottom>
                                Галерея
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
                                {knife.images.map((img, index) => (
                                    <ImageListItem key={index}>
                                        <img
                                            src={`${API}${img}`}
                                            alt={`Image ${index + 1}`}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = defaultImage;
                                            }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            )}
            </Card>
        </Box>
        </main>
    );
}
