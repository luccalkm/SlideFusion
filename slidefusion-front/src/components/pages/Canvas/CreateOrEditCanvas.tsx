import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Fab, TextField } from '@mui/material';
import { CanvasContext } from '../../../context/CanvasContext';
import Slide from '../../canvas/Slide';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddOutlined, ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, Delete, Save, TextFieldsOutlined } from "@mui/icons-material";
import { Grid, ButtonGroup } from "@mui/material";
import ConfirmModal from "../../common/ConfirmModal";

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
        console.log(state?.canvasData);
    }, [state]);

    if (!state?.isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ height: '72vh', minHeight: '72vh', maxHeight: '72vh', padding: 2 }}>
            <Button onClick={handleClick} sx={{ position: 'absolute', bottom: 0, left: 40, margin: 5 }} variant='contained'>
                Testar funcionalidade da API
            </Button>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
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
                    //click
                    ><Delete />
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"
                    //click
                    ><Save />
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
                            >
                                {state?.canvasData?.title}
                            </TextField>
                            <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={2} width={'100%'} height={'100%'} overflow={'scroll'}>
                                {state?.canvasData?.slides
                                    ? state?.canvasData?.slides.map((slide) => {
                                        return (<Slide
                                            testContent={state?.canvasData?.slides[state.selectedSlideIndex].id + "e também " + state.selectedSlideIndex}
                                            key={slide.id}
                                            mini
                                            backgroundColor={slide.backgroundColor}
                                            backgroundImageUrl={slide.backgroundImageUrl}
                                        />);
                                    })
                                    : null
                                }
                                <Fab
                                    onClick={() => {
                                        actions?.setCanvasData({
                                            ...state.canvasData,
                                            slides: [
                                                ...state.canvasData.slides,
                                                {
                                                    id: uuidv4(),
                                                    order: state.canvasData.slides.length,
                                                    backgroundColor: '#ffffff',
                                                    backgroundImageUrl: '',
                                                    slideObjects: []
                                                }
                                            ],
                                        });
                                        actions?.setSelectedSlideIndex(state.canvasData.slides.length);
                                    }}
                                    sx={{ boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.8)' }}
                                    color="primary"
                                    aria-label="add">
                                    <AddOutlined />
                                </Fab>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8.4} sx={{ height: '100%' }}>
                        {state?.canvasData?.slides
                            ? (<Slide
                                testContent={state?.canvasData?.slides[state.selectedSlideIndex].id + "e também " + state.selectedSlideIndex}
                                editable
                                key={state?.canvasData?.slides[state.selectedSlideIndex].id}
                                backgroundColor={state?.canvasData?.slides[state.selectedSlideIndex].backgroundColor}
                                backgroundImageUrl={state?.canvasData?.slides[state.selectedSlideIndex].backgroundImageUrl}
                            />)
                            // ? state?.canvasData?.slides.map((slide) => {
                            //     return (<Slide
                            //         editable
                            //         key={slide.id}
                            //         backgroundColor={slide.backgroundColor}
                            //         backgroundImageUrl={slide.backgroundImageUrl}
                            //     />);
                            // })
                            : null}
                    </Grid>
                </Grid>
            </Grid>
            {
                openConfirmModal &&
                <ConfirmModal
                    open={openConfirmModal}
                    handleClose={() => setOpenConfirmModal(false)}
                    title={"Deseja excluir essa apresentação?"}
                    text={"Se a apresentação for excluída, não será possível recuperá-la."}
                />
            }
        </Box>
    );
}

export default CreateOrEditCanvas;
