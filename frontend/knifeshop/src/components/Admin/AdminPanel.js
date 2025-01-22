import { Box, List, ListItemButton, Divider, Drawer, Button } from "@mui/material";
import {useState} from 'react';
import CreateKnife from "./CreateKnife"

export default function AdminPanel() {
    // Состояние для отображения компонента "Создать нож"
    const [showCreateKnife, setShowCreateKnife] = useState(false);
  
    const handleCreateKnifeClick = () => {
      setShowCreateKnife(true);  // Показываем компонент для создания ножа
    };
  
    return (
      <Box sx={{ display: 'flex'}}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              height: '100vh',
              position: 'relative',
            },
          }}
        >
          <List>
            <ListItemButton onClick={handleCreateKnifeClick}>
                СОЗДАТЬ НОЖ
            </ListItemButton>
            <Divider />
            <ListItemButton>
                СООБЩЕНИЯ
            </ListItemButton>
          </List>
        </Drawer>
  
        <main>
            {showCreateKnife && <CreateKnife />}
        </main>
      </Box>
    );
  }