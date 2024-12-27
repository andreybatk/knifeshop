import React from 'react';
import { Box, Grid2, Typography, IconButton } from '@mui/material';
import { CheckCircle, Speed, ThumbUp } from '@mui/icons-material'; // Иконки из MUI

const AboutUs = () => {
  return (
    <Box sx={{ padding: 6, backgroundColor: '#f4f4f4', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
      Почему стоит выбрать нас?
      </Typography>
      <Grid2 container spacing={6} sx={{ justifyContent: 'center', marginTop: 4 }}>
        <Grid2 item xs={12} sm={4}>
          <Box sx={{ margin: 2, textAlign: 'center' }}>
            <IconButton sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }}>
              <CheckCircle />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: '16px', color: '#666' }}>
            Качество
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
            Мы обеспечиваем высочайшее качество всех наших услуг.
            </Typography>
          </Box>
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <Box sx={{ margin: 2, textAlign: 'center' }}>
            <IconButton sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }}>
              <Speed />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: '16px', color: '#666' }}>
            Скорость
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
            Быстрая доставка и быстрые результаты — наши главные приоритеты.
            </Typography>
          </Box>
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <Box sx={{ margin: 2, textAlign: 'center' }}>
            <IconButton sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }}>
              <ThumbUp />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: '16px', color: '#666' }}>
            Удовлетворение
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
            Мы ориентируемся на удовлетворение потребностей клиентов и всегда делаем все возможное.
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AboutUs;
