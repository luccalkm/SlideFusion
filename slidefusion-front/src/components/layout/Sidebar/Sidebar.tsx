import { useState, useRef } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { RouteItem } from "../../types/RouteItem";
import { Link } from "react-router-dom";

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
    top: '64px',
  },
}));

type Props = {
    items: RouteItem[];
}

export default function Sidebar({ items }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !(drawerRef.current as any).contains(event.target)) {
      setIsOpen(false);
    }
  }

  const handleDrawerClick = (event: MouseEvent) => {
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
          <Grid container direction="column">
            {items.map((item) => (
              <Grid item key={item.displayName}>
                <ListItemButton 
                    component={Link}
                    to={item.link}    
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && 
                  <ListItemText 
                    primary={
                        <Typography variant="body2">
                          {item.displayName}
                        </Typography>
                    } />
                  }
                </ListItemButton>
              </Grid>
            ))}
          </Grid>
        </List>
      </StyledDrawer>
    </div>
  );
}
