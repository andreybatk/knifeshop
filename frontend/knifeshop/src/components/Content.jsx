import Carousell from "../Carousell";
import AboutUs from "./AboutUs";
import CatalogCallToAction from "./CatalogCallToAction";
import { Box, Grid2, Typography } from '@mui/material';

export default function Content() {
    return (
        <main className="container">
            <Box sx={{ padding: 4 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Магазин ножей от Димона
                </Typography>

                {/* Карусель */}
                <Grid2 container spacing={4} justifyContent="center">
                    <Grid2 item xs={12}>
                        <Carousell />
                    </Grid2>
                </Grid2>

                {/* Добавляем отступ между каруселью и блоком с каталогом */}
                <Box sx={{ marginTop: 6 }} />

                {/* Catalog Call to Action */}
                <Grid2 container spacing={4} justifyContent="center">
                    <Grid2 item xs={12}>
                        <CatalogCallToAction />
                    </Grid2>
                </Grid2>

                {/* About Us с иконками */}
                <Grid2 container spacing={4} justifyContent="center" sx={{ marginTop: 6 }}>
                    <Grid2 item xs={12}>
                        <AboutUs />
                    </Grid2>
                </Grid2>
            </Box>
        </main>
    );
}