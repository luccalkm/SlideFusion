import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, Tooltip } from '@mui/material';
import { ESlideObject, SlideObject } from '../../../types/Entities';
import { ShapeToolbar } from './Toolbar/ShapeToolbar';
import { CanvasContext } from "../../../context/CanvasContext";
import { useContext } from "react";
import { ArrowDownward, ArrowUpward, ContentCopy, Delete } from "@mui/icons-material";

type Props = {
    slideObject: SlideObject;
    setSelectedObject: (index: number | null) => void;
};

export const CanvasObjectToolbar = ({ slideObject, setSelectedObject }: Props) => {
    const { actions, state } = useContext(CanvasContext);

    const handleObjectDelete = () => {
        if (!actions || !actions.removeSlideObject) return;
        
        actions.removeSlideObject(slideObject.id);
        setSelectedObject(null);
    };

    const handleObjectDuplicate = () => {
        if (!actions || !actions.duplicateSlideObject) return;
        if (!state || !state.canvasData || !state.canvasData.slides) return;

        actions.duplicateSlideObject(slideObject.id);

        const slideObjects = state.canvasData.slides[state.selectedSlideIndex]?.slideObjects;
        if (slideObjects) {
            setSelectedObject(slideObjects.length);
        }
    };

    const renderToolbarOptions = () => {
        switch (slideObject.type) {
            case ESlideObject.Shape:
                return <ShapeToolbar slideObject={slideObject} />;
            default:
                return null;
        }
    };

    return (
        <Grid
            container
            onClick={(e) => e.stopPropagation()}
            position="absolute"
            top={`-20%`}
            left={`50%`}
            style={{ transform: "translateX(-50%)" }}
            padding={1}
            bgcolor="white"
            boxShadow={3}
            width={'80%'}
            zIndex={1}
            sx={{ borderRadius: 2 }}
        >
            <Grid item display={'flex'} alignItems="center">
                <Tooltip title="Delete">
                    <IconButton
                        onClick={handleObjectDelete}
                        aria-label="delete"
                        size="small"
                    >
                        <Delete fontSize="small" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Duplicate">
                    <IconButton
                        onClick={handleObjectDuplicate}
                        aria-label="duplicate"
                        size="small"
                    >
                        <ContentCopy fontSize="small" color="primary" />
                    </IconButton>
                </Tooltip>
                <Divider sx={{ marginX: 1 }} orientation="vertical" flexItem />
                <Grid item>
                    <InputLabel>Depth</InputLabel>
                    <Tooltip title="Send Backward">
                        <Button
                            onClick={() => console.log('Send Backward')}
                            aria-label="order-down"
                            size="small"
                        >
                            <ArrowDownward fontSize="small" color="primary" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Bring Forward">
                        <Button
                            onClick={() => console.log('Bring Forward')}
                            aria-label="order-up"
                            size="small"
                        >
                            <ArrowUpward fontSize="small" color="primary" />
                        </Button>
                    </Tooltip>
                </Grid>
                <Divider sx={{ marginX: 1 }} orientation="vertical" flexItem />
            </Grid>
            {renderToolbarOptions()}
        </Grid>
    );
};
