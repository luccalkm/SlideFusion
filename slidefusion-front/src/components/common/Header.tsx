import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, styled } from '@mui/material';
import { Login, Logout, Settings } from '@mui/icons-material';
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledIconButton = styled(IconButton)(() => ({
    color: 'inherit'
}));

export default function Header() {
    const [auth, setAuth] = useState(true);

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link onClick={() => setAuth(!auth)} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        noWrap
                        variant="h6"
                    >
                        OnionGallery
                    </Typography>
                </Link>
                {/* TODO: login */}
                {auth ? (
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
