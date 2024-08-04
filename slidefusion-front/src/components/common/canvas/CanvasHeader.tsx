import React, { useContext, useRef } from 'react';
import { Box, Button, ButtonGroup, Grid, TextField } from '@mui/material';
import { ArrowBack, ChangeHistoryOutlined, CropOriginalOutlined, CropSquareSharp, Delete, Save, TextFieldsOutlined } from "@mui/icons-material";
import { useNavigate, useLocation, To } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CanvasContext } from "../../../context/CanvasContext";
import { ESlideObject, ImageObject, ShapeObject } from "../../../types/Entities";

type CanvasHeaderProps = {
    setOpenConfirmModal: (open: boolean) => void;
    setSelectedObject: (index: number | null) => void;
};

export const CanvasHeader: React.FC<CanvasHeaderProps> = ({ setSelectedObject, setOpenConfirmModal }) => {
    const { state, actions } = useContext(CanvasContext);
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleBackClick = () => {
        navigate((location.key === "default" ? "/" : -1) as To);
    };

    const addShapeObject = () => {
        if (!state?.canvasData?.slides) return;

        const newObject: ShapeObject = {
            id: uuidv4(),
            position: { x: 10, y: 10 },
            size: { width: 100, height: 50 },
            type: ESlideObject.Shape,
            depth: 1,
            backgroundColor: "#000",
        };

        actions?.setCanvasData((prevState) => {
            const updatedSlides = [...prevState.slides];
            updatedSlides[state.selectedSlideIndex].slideObjects!.push(newObject);
            return { ...prevState, slides: updatedSlides };
        });

        setSelectedObject(
            state.canvasData.slides[state.selectedSlideIndex].slideObjects!.length - 1
        );
    };

    const addImageObject = () => {
        if (!state?.canvasData?.slides) return;

        const newImageObject: ImageObject = {
            id: uuidv4(),
            position: { x: 10, y: 10 },
            size: { width: 200, height: 200 },
            depth: 1,
            type: ESlideObject.Image,
            backgroundImageUrl: "",
        };

        actions?.setCanvasData((prevState) => {
            const updatedSlides = [...prevState.slides];
            updatedSlides[state.selectedSlideIndex].slideObjects!.push(newImageObject);
            return { ...prevState, slides: updatedSlides };
        });

        setSelectedObject(
            state.canvasData.slides[state.selectedSlideIndex].slideObjects!.length - 1
        );

        triggerImageUpload(newImageObject.id);
    };

    const triggerImageUpload = (slideObjectId: string) => {
        fileInputRef.current?.click();
        fileInputRef.current!.onchange = (event) => {
            actions?.handleImageUpload(event as unknown as React.ChangeEvent<HTMLInputElement>, slideObjectId);
        };
    };

    return (
        <Grid item xs={12}>
            <Grid container justifyContent={"space-between"} alignItems={"center"} padding={"1rem 2rem"}>
                <Grid item>
                    <Box display="flex" gap={1}>
                        <Button size="large" variant="outlined" onClick={handleBackClick}>
                            <ArrowBack />
                        </Button>
                        <Button size="large" variant="outlined" color="error" onClick={() => setOpenConfirmModal(true)}>
                            <Delete />
                        </Button>
                        <Button size="large" variant="outlined" color="success">
                            <Save />
                        </Button>
                    </Box>
                </Grid>
                <Grid item display={"flex"} gap={2} alignItems={"center"}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Nova apresentação"
                        value={state?.canvasData?.title || ""}
                        onChange={(e) =>
                            actions?.setCanvasData({
                                ...state!.canvasData!,
                                title: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid item>
                    <ButtonGroup>
                        <Button>
                            <TextFieldsOutlined />
                        </Button>
                        <Button onClick={addShapeObject}>
                            <CropSquareSharp />
                        </Button>
                        <Button>
                            <ChangeHistoryOutlined />
                        </Button>
                        <Button onClick={addImageObject}>
                            <CropOriginalOutlined />
                        </Button>
                    </ButtonGroup>
                </Grid>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />
            </Grid>
        </Grid>
    );
};
