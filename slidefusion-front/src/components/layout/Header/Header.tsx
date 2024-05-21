// src/components/layout/Header/Header.tsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { Login, Logout, Settings } from '@mui/icons-material';

type Props = {}

export default function Header({}: Props) {
    return (
        <Box flexGrow={1}>
          <AppBar 
            position="fixed" 
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1, paddingX: 10 }} 
            color="primary"
          >
            <Toolbar>
              <Typography noWrap variant="h6">
                OnionGallery
              </Typography>
              {/* TODO: login */}
                {true ? (
                <IconButton color="inherit">
                        <Login />
                </IconButton>
                ) 
                : 
                (
                    <>
                        <IconButton color='inherit'>
                            <Logout />
                        </IconButton>
                        <IconButton color='inherit'>
                            <Settings />
                        </IconButton>
                    </>
                )}
            </Toolbar>
          </AppBar>
        </Box>
      );
}
