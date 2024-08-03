import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from "../common/Header";
import { routeItems } from "../routes/routes";
import { CanvasProvider } from '../../context/CanvasContext';
import Sidebar from "../common/Sidebar";
import Gallery from "../pages/Canvas/Gallery";
import Profile from "../pages/User/Profile";
import Home from "../pages/Home/Home";
import CreateOrEditCanvas from "../pages/Canvas/CreateOrEditCanvas";

const AppRoutes = () => {
    return (
        <CanvasProvider>
            <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <Header />
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Sidebar items={routeItems} />
                        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                            <>
                                <Routes>
                                    <Route path="/" element={<Home presentations={[]} />} />
                                    <Route path="/gallery" element={<Gallery />} />
                                    <Route path="/create-presentation" element={<CreateOrEditCanvas/>} />
                                    <Route path="/profile" element={<Profile />} />
                                </Routes>
                            </>
                        </Box>
                    </Box>
                </Box>
            </Router>
        </CanvasProvider>
    );
}

export default AppRoutes;
