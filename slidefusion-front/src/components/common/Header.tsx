import React, { useState } from 'react';
import { Box, Toolbar, Typography, IconButton, styled } from '@mui/material';
import { Login, Logout, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import mainTheme from "../../styles/themes/mainTheme";

const StyledIconButton = styled(IconButton)(() => ({
    color: 'inherit'
}));

const CustomAppBar = styled(Box)(() => ({
    position: 'fixed',
    width: '100%',
    backgroundColor: mainTheme.palette.primary.main,
    boxShadow: 'none', 
    zIndex: 1100,
    color: "white",
}));

export default function Header() {
    const [auth, setAuth] = useState(true);

    return (
        <CustomAppBar>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link onClick={() => setAuth(!auth)} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        noWrap
                        variant="h6"
                    >
                        OnionGallery
                    </Typography>
                </Link>
                {auth ? (
                    <StyledIconButton>
                        <Login />
                    </StyledIconButton>
                ) : (
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
        </CustomAppBar>
    );
}
