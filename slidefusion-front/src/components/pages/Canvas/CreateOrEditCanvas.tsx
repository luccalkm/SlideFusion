import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Grid, ButtonGroup } from '@mui/material';
import { CanvasContext } from '../../../context/CanvasContext';
import Slide from '../../canvas/Slide';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, Delete, Save, TextFieldsOutlined } from "@mui/icons-material";
import ConfirmModal from "../../common/ConfirmModal";
import AddSlideButton from "../../canvas/AddSlideButton";

function CreateOrEditCanvas() {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const handleOpen = () => setOpenConfirmModal(true);

    const navigate = useNavigate();
    const location = useLocation();
    const { state, actions } = useContext(CanvasContext);

    useEffect(() => {
        actions?.loadCanvasDataFromSession();
    }, []);

    const handleBackClick = () => {
        if (location.key === 'default') {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    const handleClick = async () => {
        if (state?.canvasData?.slides && state?.canvasData?.slides.length > 0)
            actions?.setCanvasData({ ...state?.canvasData, slides: state?.canvasData?.slides.map(slide => ({ ...slide, backgroundColor: '#fff' })) });
    };

    useEffect(() => {
        if (!state?.canvasData?.slides || state?.canvasData?.slides.length === 0) {
            actions?.createNewCanvas();
        }
    }, []);

    useEffect(() => {
        console.log(state?.canvasData?.slides, state?.selectedSlideIndex)
        if (state?.canvasData?.slides && state?.selectedSlideIndex === undefined) {
            actions?.setSelectedSlideIndex(0);
        }
    }, [state?.canvasData?.slides]);


    const addNewSlide = () => {
        const newSlide = {
            id: uuidv4(),
            order: state?.canvasData.slides.length,
            backgroundColor: '#ffffff',
            backgroundImageUrl: '',
            slideObjects: []
        };
        actions?.setCanvasData({
            ...state?.canvasData,
            slides: [...state?.canvasData.slides, newSlide],
        });
        actions?.setSelectedSlideIndex(state?.canvasData?.slides?.length);
    };

    if (!state?.isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ height: '72vh', minHeight: '72vh', maxHeight: '72vh', padding: 2 }}>
            <Button onClick={handleClick} sx={{ position: 'absolute', right: 0, top: 0, margin: 5 }} variant='contained'>
                Testar funcionalidade da API
            </Button>
            <Grid item
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={5}
            >
                <Box display='flex' gap={1}>
                    <Button
                        variant="outlined"
                        onClick={handleBackClick}
                    >
                        <ArrowBack />
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleOpen}
                    >
                        <Delete />
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"
                    >
                        <Save />
                    </Button>
                </Box>
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
            <Grid container direction="column" sx={{ height: '100%' }}>
                <Grid item container gap={3} sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
                    <Grid item xs={3} sx={{ height: '100%' }}>
                        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                            <TextField
                                fullWidth
                                label="Título da apresentação"
                                variant="standard"
                                value={state?.canvasData?.title}
                                onChange={(e) => actions?.setCanvasData({ ...state.canvasData, title: e.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box 
                                display={'flex'} 
                                position={'relative'}
                                alignItems={'center'} 
                                flexDirection={'column'} 
                                gap={2} 
                                width={'100%'} 
                                height={'62vh'}
                                paddingTop={2}
                                sx={{overflowY: 'auto'}}
                            >
                                {state?.canvasData?.slides.map((slide, index) => (
                                    <Slide
                                        onClick={() => actions?.setSelectedSlideIndex(index)}
                                        testContent={`Slide ${index + 1}`}
                                        key={slide.id}
                                        mini
                                        backgroundColor={slide.backgroundColor}
                                        backgroundImageUrl={slide.backgroundImageUrl}
                                    />
                                ))}
                                <AddSlideButton onClick={addNewSlide} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8.4} sx={{ height: '100%' }}>
                        {state?.canvasData?.slides.length > 0 && state?.canvasData?.slides[state.selectedSlideIndex] && (
                            <Slide
                                testContent={`Slide ${state.selectedSlideIndex + 1}`}
                                editable
                                key={state?.canvasData?.slides[state.selectedSlideIndex].id}
                                backgroundColor={state?.canvasData?.slides[state.selectedSlideIndex].backgroundColor}
                                backgroundImageUrl={state?.canvasData?.slides[state.selectedSlideIndex].backgroundImageUrl}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
            {openConfirmModal && (
                <ConfirmModal
                    open={openConfirmModal}
                    handleClose={() => setOpenConfirmModal(false)}
                    title={"Deseja excluir essa apresentação?"}
                    text={"Se a apresentação for excluída, não será possível recuperá-la."}
                />
            )}
        </Box>
    );
}

export default CreateOrEditCanvas;
