/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import { CanvasContext } from "../../../context/CanvasContext";
import ConfirmModal from "../../common/ConfirmModal";
import CanvasSlideObject from "../../canvas/SlideObjects/CanvasSlideObject";
import { Slide } from "../../../types/Entities";
import { Thumbnail } from "../../canvas/Thumbnail/Thumbnails";
import { v4 as uuidv4 } from "uuid";
import AddIcon from '@mui/icons-material/Add';
import { CanvasHeader } from "../../common/canvas/CanvasHeader";

const CreateOrEditCanvas = () => {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const { state, actions } = useContext(CanvasContext);
    const [selectedObject, setSelectedObject] = useState<number | null>(null);
    const [thumbnails, setThumbnails] = useState<Slide[]>([]);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    const slideDefaultSize = { width: 60, height: 25 };

    const createNewSlide = (): Slide => ({
        id: uuidv4(),
        order: state?.canvasData?.slides?.length || 0,
        backgroundColor: "#fff",
        backgroundImageUrl: "",
        slideObjects: [],
    });

    const handleClickOutside = () => {
        setSelectedObject(null);
    };

    useEffect(() => {
        actions?.loadCanvasDataFromSession();
    }, []);

    useEffect(() => {
        if (state?.canvasData?.slides) {
            setThumbnails(state.canvasData.slides);
        }
    }, [state?.canvasData]);

    useEffect(() => {
        if (state?.canvasData?.slides) {
            const slides = state.canvasData.slides.map((slide) => ({
                ...slide,
                slideObjects: slide.slideObjects!.map((obj) => ({ ...obj })),
            }));
            setThumbnails(slides);
        }
    }, [state?.canvasData?.slides, actions]);

    if (!state?.isLoaded || !state?.canvasData?.slides) {
        return <div>Loading...</div>;
    }

    const addNewSlide = () => {
        const newSlide = createNewSlide();
        actions?.setCanvasData((prevState) => ({
            ...prevState,
            slides: [...prevState.slides, newSlide],
        }));
        actions?.setSelectedSlideIndex(state?.canvasData?.slides.length);
    };

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggingIndex(index);
        const img = new Image();
        img.src =
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
        event.dataTransfer.setDragImage(img, 0, 0);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDragOverThumbnail = (index: number) => {
        if (draggingIndex === null) return;
        if (draggingIndex === index) return;

        const reorderedThumbnails = Array.from(thumbnails);
        const [removed] = reorderedThumbnails.splice(draggingIndex, 1);
        reorderedThumbnails.splice(index, 0, removed);

        setDraggingIndex(index);
        setThumbnails(reorderedThumbnails);
    };

    const onDragEnd = () => {
        setDraggingIndex(null);
        actions?.setCanvasData((prevState) => ({
            ...prevState,
            slides: thumbnails,
        }));
    };

    return (
        <Grid onClick={handleClickOutside} marginTop={"5rem"} height={"90vh"}>
            <CanvasHeader
                setOpenConfirmModal={setOpenConfirmModal}
                setSelectedObject={setSelectedObject}
            />
            <Grid
                height={"70%"}
                container
                sx={{ borderTop: "2px solid #cecece", backgroundColor: "#e1e4e7" }}
            >
                <Box
                    sx={{
                        backgroundColor:
                            state!.canvasData!.slides[state.selectedSlideIndex]
                                .backgroundColor,
                        position: "relative",
                        margin: "auto",
                        width: `60rem`,
                        height: `25rem`,
                        boxShadow: "0px 0px 2px #000",
                        aspectRatio: "2 / 1",
                    }}
                >
                    {state!.canvasData!.slides[
                        state.selectedSlideIndex
                    ]!.slideObjects!.map((object, index) => (
                        <CanvasSlideObject
                            key={object.id}
                            setSelectedObject={setSelectedObject}
                            selectedObject={selectedObject}
                            index={index}
                            slideObject={object}
                        />
                    ))}
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ borderTop: "2px solid #cecece", paddingTop: "0.5rem" }}
                onDragOver={onDragOver}
            >
                <Box
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        padding: "1rem",
                        gap: "1rem",
                    }}
                >
                    {thumbnails.map((slide, index) => (
                        <div
                            key={slide.id}
                            draggable
                            onDragStart={(event) => onDragStart(event, index)}
                            onDragOver={() => onDragOverThumbnail(index)}
                            onDragEnd={onDragEnd}
                            style={{
                                cursor: "grab",
                                boxShadow:
                                    draggingIndex === index
                                        ? "0px 0px 8px rgba(0,0,0,0.7)"
                                        : "0px 0px 4px #000",
                            }}
                        >
                            <Thumbnail
                                draggingIndex={draggingIndex}
                                slide={slide}
                                index={index}
                                slideDefaultSize={slideDefaultSize}
                                setSelectedObject={setSelectedObject}
                            />
                        </div>
                    ))}
                    <Tooltip title={"Adicionar página"} placement="top">
                        <Box
                            onClick={addNewSlide}
                            minWidth={`${slideDefaultSize.width * 0.2}rem`}
                            minHeight={`${slideDefaultSize.height * 0.2}rem`}
                            sx={{ cursor: "pointer", boxShadow: "0px 0px 4px #000" }}
                            display={"flex"}
                        >
                            <AddIcon
                                fontSize={"large"}
                                color="primary"
                                sx={{ margin: "auto" }}
                            />
                        </Box>
                    </Tooltip>
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
