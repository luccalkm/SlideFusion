import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Grid, ButtonGroup } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, Delete, EvStationOutlined, Save, TextFieldsOutlined } from "@mui/icons-material";
import { CanvasContext } from '../../../context/CanvasContext';
import ConfirmModal from "../../common/ConfirmModal";
import AddSlideButton from "../../canvas/AddSlideButton";
import { ESlideObject, Slide, TextObject } from "../../../utils/types/Entities";
import CanvaSlide from "../../canvas/CanvaSlide";

const CreateOrEditCanvas = () => {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const { state, actions } = useContext(CanvasContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        actions?.loadCanvasDataFromSession();
    }, []);

    useEffect(() => {
        if (!state?.canvasData?.slides?.length) {
            actions?.createNewCanvas();
        }
    }, [state?.canvasData?.slides]);

    useEffect(() => {
        if (state?.canvasData?.slides && state?.selectedSlideIndex === undefined) {
            actions?.setSelectedSlideIndex(0);
        }
    }, [state?.canvasData?.slides, actions]);

    const handleBackClick = () => {
        navigate(location.key === 'default' ? '/' : -1);
    };

    const handleClick = async () => {
        if (state?.canvasData?.slides?.length) {
            actions?.setCanvasData({
                ...state.canvasData,
                slides: state.canvasData.slides.map(slide => ({ ...slide, backgroundColor: '#fff' }))
            });
        }
    };

    const createNewSlide = (): Slide => ({
        id: uuidv4(),
        order: state?.canvasData.slides.length || 0,
        backgroundColor: '#ffffff',
        backgroundImageUrl: '',
        slideObjects: []
    });

    const addNewSlide = () => {
        const newSlide = createNewSlide();
        actions?.setCanvasData({
            ...state?.canvasData,
            slides: [...state?.canvasData?.slides, newSlide]
        });
        actions?.setSelectedSlideIndex(state?.canvasData?.slides.length);
    };

    const createTextObject = (objectType: ESlideObject): TextObject => ({
        id: uuidv4(),
        type: objectType,
        position: { x: 25, y: 25 },
        size: { width: 16, height: 16 },
        content: 'Texto',
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        italic: false,
        underline: false,
        align: 'left',
        order: 0,
        backgroundColor: ""
    });

    const addTextObject = () => {
        if (state?.selectedSlideIndex === undefined || !state?.canvasData?.slides) 
            return;

        const newObject = createTextObject(ESlideObject.Text);
        actions?.setCanvasData({
            ...state.canvasData,
            slides: state.canvasData.slides.map((slide, index) => {
                if (index === state.selectedSlideIndex) {
                    return {
                        ...slide,
                        slideObjects: slide.slideObjects ? [...slide.slideObjects, newObject] : [newObject]
                    };
                }
                return slide;
            })
        });
    };

    if (!state?.isLoaded) {
        return <div>Loading...</div>;
    }

    const selectedSlide = state.canvasData?.slides?.[state.selectedSlideIndex];

    return (
        <Box sx={{ height: '72vh', minHeight: '72vh', maxHeight: '72vh', padding: 2 }}>
            <Button onClick={handleClick} sx={{ position: 'absolute', right: 0, top: 0, margin: 5 }} variant='contained'>
                Testar funcionalidade da API
            </Button>
            <Grid item display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={5}>
                <Box display='flex' gap={1}>
                    <Button variant="outlined" onClick={handleBackClick}><ArrowBack /></Button>
                    <Button variant="outlined" color="error" onClick={() => setOpenConfirmModal(true)}><Delete /></Button>
                    <Button variant="outlined" color="success"><Save /></Button>
                </Box>
                <ButtonGroup>
                    <Button onClick={addTextObject}><TextFieldsOutlined /></Button>
                    <Button><CropSquareSharp /></Button>
                    <Button><ChangeHistoryOutlined /></Button>
                    <Button><CropOriginalOutlined /></Button>
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
                                paddingTop={0.5}
                                sx={{overflowY: 'auto'}}
                            >
                                {state?.canvasData?.slides?.map((slide, index) => (
                                    <CanvaSlide
                                        onClick={() => actions?.setSelectedSlideIndex(index)}
                                        key={slide.id}
                                        mini
                                        backgroundColor={slide.backgroundColor}
                                        backgroundImageUrl={slide.backgroundImageUrl}
                                        objects={slide.slideObjects}
                                    />
                                ))}
                                <AddSlideButton onClick={addNewSlide} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8.4} sx={{ height: '100%' }}>
                        {selectedSlide && (
                            <CanvaSlide
                                editable
                                key={selectedSlide.id}
                                backgroundColor={selectedSlide.backgroundColor}
                                backgroundImageUrl={selectedSlide.backgroundImageUrl}
                                objects={selectedSlide.slideObjects}
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
};

export default CreateOrEditCanvas;
