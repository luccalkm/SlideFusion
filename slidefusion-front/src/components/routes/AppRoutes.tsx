// src/routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from "../layout/Header/Header";
import Sidebar from "../layout/Sidebar/Sidebar";
import Home from "../pages/Home/Home";
import Gallery from "../pages/Presentation/Gallery";
import CreatePresentation from "../pages/Presentation/CreatePresentation";
import Profile from "../pages/User/Profile";
import { routeItems } from "../routes/routes.tsx";
import { MainBox } from "../layout/General/MainBox.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header />
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Sidebar items={routeItems} />
                    <Box sx={{ flexGrow: 1 }}>
                        <MainBox component="main">
                            <Routes>
                                <Route path="/" element={<Home presentations={[]} />} />
                                <Route path="/gallery" element={<Gallery/>} />
                                <Route path="/create-presentation" element={<CreatePresentation/>} />
                                <Route path="/profile" element={<Profile/>} />
                            </Routes>
                        </MainBox>
                    </Box>
                </Box>
            </Box>
        </Router>
    );
}

export default AppRoutes;
