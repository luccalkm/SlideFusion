import { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, ButtonGroup, TextField, Tooltip } from '@mui/material';
import { useNavigate, useLocation, To } from 'react-router-dom';
import { ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, Delete, Save, TextFieldsOutlined } from "@mui/icons-material";
import { CanvasContext } from '../../../context/CanvasContext';
import ConfirmModal from "../../common/ConfirmModal";
import CanvasSlideObject from "../../canvas/SlideObjects/CanvasSlideObject";
import AddSlideButton from "../../canvas/SlideObjects/AddSlideButton";
import { ESlideObject, Slide, SlideObject } from "../../../utils/types/Entities";

const CreateOrEditCanvas = () => {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const { state, actions } = useContext(CanvasContext);
    const [selectedObject, setSelectedObject] = useState<number | null>(null);
    const [thumbnails, setThumbnails] = useState<Slide[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const baseMiniSlideProportion = 0.4;
    const slideDefaultSize = { w: 70, h: 35};

    const handleClickOutside = () => {
        setSelectedObject(null);
    };

    useEffect(() => {
        actions?.loadCanvasDataFromSession();
    }, []);

    useEffect(() => {
        if (state?.canvasData) {
            setThumbnails(state.canvasData.slides);
        }
    }, [state?.canvasData]);

    useEffect(() => {
        if (state?.canvasData?.slides) {
            const slides = state.canvasData.slides.map(slide => ({
                ...slide,
                slideObjects: slide.slideObjects!.map(obj => ({ ...obj }))
            }));
            setThumbnails(slides);
        }
    }, [state?.canvasData?.slides, actions]);


    const handleBackClick = () => {
        navigate((location.key === 'default' ? '/' : -1) as To);
    };

    if (!state?.isLoaded) {
        return <div>Loading...</div>;
    }

    const handleTestAdd = () => {
        const newObject: SlideObject = {
            id: `${state.canvasData.slides[state.selectedSlideIndex].slideObjects!.length + 1}`,
            position: { x: 10, y: 10 },
            size: { width: 100, height: 50 },
            type: ESlideObject.Shape,
            order: 0,
            backgroundColor: ''
        };
        actions?.setCanvasData(prevState => {
            const updatedSlides = [...prevState.slides];
            updatedSlides[state.selectedSlideIndex].slideObjects!.push(newObject);
            return { ...prevState, slides: updatedSlides };
        });
        setSelectedObject(state.canvasData.slides[state.selectedSlideIndex].slideObjects!.length - 1);
    };

    const createNewSlide = (): Slide => ({
        id: "a",
        order: state?.canvasData.slides.length || 0,
        backgroundColor: '#ffffff',
        backgroundImageUrl: '',
        slideObjects: []
    });

    const addNewSlide = () => {
        const newSlide = createNewSlide();
        actions?.setCanvasData(prevState => ({
            ...prevState,
            slides: [...prevState.slides, newSlide]
        }));
        actions?.setSelectedSlideIndex(state?.canvasData?.slides.length);
    };

    return (
        <Grid container onClick={handleClickOutside} spacing={2} >
            <Grid item xs={12}>
                <Grid container display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={5}>
                    <Box display='flex' gap={1}>
                        <Button variant="outlined" onClick={handleBackClick}><ArrowBack /></Button>
                        <Button variant="outlined" color="error" onClick={() => setOpenConfirmModal(true)}><Delete /></Button>
                        <Button variant="outlined" color="success"><Save /></Button>
                    </Box>
                    <ButtonGroup>
                        <Button><TextFieldsOutlined /></Button>
                        <Button onClick={handleTestAdd}><CropSquareSharp /></Button>
                        <Button><ChangeHistoryOutlined /></Button>
                        <Button><CropOriginalOutlined /></Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Grid height={"30rem"} item xs={12} md={4}>
                <TextField
                    fullWidth
                    label="Título da apresentação"
                    variant="standard"
                    value={state?.canvasData?.title}
                    onChange={(e) => actions?.setCanvasData({ ...state.canvasData, title: e.target.value })}
                    sx={{ marginBottom: 2 }}
                />
                <Box height={"100%"} style={{ borderBottom: "2px solid #cecece", display: 'flex', flexDirection: "column", overflowX: 'auto', padding: '1rem', gap: '1rem' }}>
                    {thumbnails.map((slide, index) => (
                        <Tooltip title={"Slide " + (index + 1)} placement="top-end" followCursor>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Box minHeight={"12rem"} minWidth={'24rem'} key={slide.id} onClick={() => actions?.setSelectedSlideIndex(index)} style={{ cursor: 'pointer', width: `${slideDefaultSize.w * baseMiniSlideProportion}rem`, height: `${slideDefaultSize.h * baseMiniSlideProportion}rem`, boxShadow: "0px 0px 4px #000" }}>
                                    <div style={{ pointerEvents: 'none', transform: `scale(${baseMiniSlideProportion})`, transformOrigin: 'top left' }}>
                                        {slide.slideObjects!.map((object, index) => (
                                            <CanvasSlideObject
                                                key={object.id}
                                                setSelectedObject={setSelectedObject}
                                                selectedObject={selectedObject}
                                                index={index}
                                                object={object}
                                                updateObjectPosition={actions!.updateObjectPosition}
                                            />
                                        ))}
                                    </div>
                                </Box>
                            </div>
                        </Tooltip>
                    ))}
                </Box>
                <AddSlideButton onClick={addNewSlide} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Box sx={{ position: 'relative', margin: 'auto', width: '100%', height: 'auto', maxWidth: `${slideDefaultSize.w}rem`, maxHeight: `${slideDefaultSize.h}rem`, boxShadow: "0px 0px 2px #000", aspectRatio: '2 / 1' }}>
                    {state!.canvasData!.slides[state.selectedSlideIndex]!.slideObjects!.map((object, index) => (
                        <CanvasSlideObject
                            key={object.id}
                            setSelectedObject={setSelectedObject}
                            selectedObject={selectedObject}
                            index={index}
                            object={object}
                            updateObjectPosition={actions!.updateObjectPosition}
                        />
                    ))}
                </Box>
            </Grid>
            {openConfirmModal && (
                <ConfirmModal
                    open={openConfirmModal}
                    handleClose={() => setOpenConfirmModal(false)}
                    title={"Deseja excluir essa apresentação?"}
                    text={"Se a apresentação for excluída, não será possível recuperá-la."}
                />
            )}
        </Grid>
    );
};

export default CreateOrEditCanvas;
