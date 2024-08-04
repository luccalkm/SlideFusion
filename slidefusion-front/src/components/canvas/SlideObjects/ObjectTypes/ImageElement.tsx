import { Box } from "@mui/material";
import { ImageObject } from "../../../../types/Entities";
import { CanvasContext } from "../../../../context/CanvasContext";
import { useContext, useEffect, useState } from "react";

type Props = {
    imageObject: ImageObject;
};

export const ImageElement = ({ imageObject }: Props) => {
    const { state } = useContext(CanvasContext);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(imageObject.backgroundImageUrl);

    useEffect(() => {
        const updatedObject = state?.canvasData.slides[state.selectedSlideIndex].slideObjects!.find(obj => obj.id === imageObject.id) as ImageObject;
        
        if (updatedObject && updatedObject.backgroundImageUrl !== backgroundImageUrl) {
            setBackgroundImageUrl(updatedObject.backgroundImageUrl);
        }
    }, [state, imageObject, backgroundImageUrl]);

    if (!backgroundImageUrl) {
        return (
            <Box
                padding={2}
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #ccc',
                    height: '200px',
                    textAlign: 'center',
                }}
            >
                <p>Drag and drop or click to upload an image!</p>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default ImageElement;
