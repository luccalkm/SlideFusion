import { useState, useRef } from 'react';
import { Home, InfoRounded, Menu } from "@mui/icons-material";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import { styled } from '@mui/material/styles';

const drawerWidth = 240;
const closedDrawerWidth = 60;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? drawerWidth : closedDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : closedDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    top: '64px', // Altura do AppBar
  },
}));

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (drawerRef.current && !(drawerRef.current as any).contains(event.target)) {
      setIsOpen(false);
    }
  }

  const handleDrawerClick = (event: any) => {
    event.stopPropagation();
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  // Adiciona evento global para fechar sidebar
  document.addEventListener('mousedown', handleClickOutside);

  return (
    <div ref={drawerRef}>
      <StyledDrawer
        variant="permanent"
        open={isOpen}
        onClick={handleDrawerClick}
      >
        <List>
          {['Home', 'About'].map((text, index) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <Home color="primary" /> : <InfoRounded color="secondary" />}
              </ListItemIcon>
              {isOpen && <ListItemText primary={text} />}
            </ListItemButton>
          ))}
        </List>
      </StyledDrawer>
    </div>
  );
}
