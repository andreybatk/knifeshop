import React from 'react';
import { Box, Grid2, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const CatalogCallToAction = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Grid2 container spacing={4} alignItems="center" justifyContent="center">
        {/* Текст с призывом перейти в каталог */}
        <Grid2 item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Познакомьтесь с нашей коллекцией ножей премиум-класса
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Откройте для себя лучшие ножи, тщательно изготовленные для качества, производительности и стиля. Найдите свой идеальный клинок сегодня!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ fontSize: '16px', padding: '10px 20px' }} 
            component={Link} to="/catalog"
          >
            ПЕРЕЙТИ К КАТАЛОГУ
          </Button>
        </Grid2>

        {/* Картинка ножа */}
        <Grid2 item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <img 
            src="/my-team.jpg"
            alt="Premium Knife" 
            style={{
              width: '100%', 
              maxHeight: '400px', 
              objectFit: 'cover', 
              borderRadius: '8px'
            }} 
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CatalogCallToAction;
