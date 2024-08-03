import { Box, IconButton, Tooltip } from "@mui/material";
import { Slide } from "../../../types/Entities";
import CanvasSlideObject from "../SlideObjects/CanvasSlideObject";
import { useContext, useState } from "react";
import { CanvasContext } from "../../../context/CanvasContext";
import { Delete } from "@mui/icons-material";
import ThumbnailIndex from "./ThumbnailIndex";

type Props = {
    draggingIndex: number | null;
    slide: Slide,
    index: number,
    slideDefaultSize: { width: number, height: number; },
    setSelectedObject: (index: number | null) => void;
};

export const Thumbnail = ({ draggingIndex, slide, index, slideDefaultSize, setSelectedObject }: Props) => {
    const { actions } = useContext(CanvasContext);
    const [showDelete, setShowDelete] = useState(false);

    const baseMiniSlideProportion = 0.2;
    const minSize = {
        width: slideDefaultSize.width * baseMiniSlideProportion,
        height: slideDefaultSize.height * baseMiniSlideProportion
    };

    const handleDeleteSlide = (id: number) => {
        actions?.removeSlide(id);
    };

    return (
        <Tooltip title={"Página " + (index + 1)} placement="top">
            <Box display={"flex"}
                position={"relative"}
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
            >
                <Box
                    onClick={() => actions?.setSelectedSlideIndex(index)}
                    sx={{
                        cursor: 'pointer',
                        width: `${minSize.width}rem`,
                        height: `${minSize.height}rem`,
                        boxShadow: "0px 0px 4px #000",
                        transition: 'box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: "0px 0px 8px rgba(0,0,0,0.7)"
                        }
                    }}
                >
                    <div style={{ zIndex: 0, pointerEvents: 'none', transform: `scale(${baseMiniSlideProportion})`, transformOrigin: 'top left' }}>
                        {slide.slideObjects!.map((slideObject, objectIndex) => (
                            <CanvasSlideObject
                                key={slideObject.id}
                                setSelectedObject={setSelectedObject}
                                selectedObject={null}
                                index={objectIndex}
                                slideObject={slideObject}
                            />
                        ))}
                    </div>
                </Box>
                {draggingIndex != null && <ThumbnailIndex index={index} />}
                {showDelete &&
                    <IconButton
                        onClick={() => handleDeleteSlide(index)}
                        sx={{ position: 'absolute', bottom: '0', right: '0', }}
                        aria-label="delete"
                        color="error"
                        size="small"
                    >
                        <Delete fontSize="small" />
                    </IconButton>}
            </Box>
        </Tooltip>
    );
};
