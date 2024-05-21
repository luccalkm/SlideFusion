import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, IconButton, styled } from '@mui/material';
import { Login, Logout, Settings } from '@mui/icons-material';

type Props = {}


const StyledIconButton = styled(IconButton)(() => ({
    color: 'inherit'
}));

export default function Header({}: Props) {
    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between' }}>
                <Typography noWrap variant="h6">
                    OnionGallery
                </Typography>
                {/* TODO: login */}
                {true ? (
                    <StyledIconButton>
                        <Login />
                    </StyledIconButton>
                ) 
                : 
                (
                    <>
                        <StyledIconButton>
                            <Logout />
                        </StyledIconButton>
                        <StyledIconButton>
                            <Settings />
                        </StyledIconButton>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
