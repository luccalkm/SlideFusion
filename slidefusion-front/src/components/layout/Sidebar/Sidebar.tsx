// src/components/layout/Sidebar/Sidebar.tsx
import { useState } from 'react';
import { Home, InfoRounded, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, Toolbar, IconButton, ListItemText } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';

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
  },
}));

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {['Home', 'About'].map((text, index) => (
          <ListItemButton key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Home color="primary" /> : <InfoRounded color="secondary" />}
            </ListItemIcon>
            {open && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
}
