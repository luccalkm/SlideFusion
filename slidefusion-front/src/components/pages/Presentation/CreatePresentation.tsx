import { ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, TextFieldsOutlined } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Grid, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function CreatePresentation() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = () => {
        if (location.key === 'default') {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    return (
        <Box sx={{ height: '72vh', padding: 2 }}>
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
                                <Button variant='contained'>
                                    
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7.8} sx={{ height: '100%' }}>
                        <Box position='relative' display={'flex'}  sx={{ margin: '1px solid #ccc', height: '100%' }}>
                            {/* Content for the right section */}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreatePresentation;
