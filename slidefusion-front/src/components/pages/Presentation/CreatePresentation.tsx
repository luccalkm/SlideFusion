import { ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, TextFieldsOutlined } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Grid, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PresentationService from "../../../utils/api/PresentationService";

function CreatePresentation() {
    const navigate = useNavigate();
    const location = useLocation();
    const presentationService = new PresentationService();

    const handleBackClick = () => {
        if (location.key === 'default') {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    const handleClick = async () => {
        const canvas = await presentationService.getCanvas();
        console.log('sim', canvas);
    }

    return (
        <Box sx={{ height: '72vh', padding: 2 }}>
        <Button onClick={handleClick} sx={{position: 'absolute', bottom: 0, right: 0, margin: 5 }} variant='contained'>
            Testar funcionalidade da API
        </Button>
            <Grid container direction="column" sx={{ height: '100%' }}>
                {/* Toolbar Section */}
                <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <IconButton onClick={handleBackClick}>
                        <ArrowBack />
                    </IconButton>
                    <ButtonGroup>
                        <Button>
                            <TextFieldsOutlined />
                        </Button>
                        <Button>
                            <CropSquareSharp />
                        </Button>
                        <Button>
                            <ChangeHistoryOutlined />
                        </Button>
                        <Button>
                            <CropOriginalOutlined />
                        </Button>
                    </ButtonGroup>
                </Grid>
                {/* Content Section */}
                <Grid item container gap={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={4} sx={{ height: '100%' }}>
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Typography align="center" variant="subtitle2">
                                New Presentation
                            </Typography>
                            <Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7.8} sx={{ height: '100%' }}>
                        <Box position='relative' display={'flex'}  sx={{ boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.3)', border: '1px solid #b0b0b0', height: '100%' }}>
                            {/* lidar com itens dentro do slide */}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreatePresentation;
