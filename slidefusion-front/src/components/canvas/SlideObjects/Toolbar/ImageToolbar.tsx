import { useContext, useRef } from "react";
import { ImageObject } from "../../../../types/Entities";
import { CanvasContext } from "../../../../context/CanvasContext";
import { Box, IconButton } from "@mui/material";
import { Upload } from "@mui/icons-material";

type Props = {
    slideObject: ImageObject;
};

export const ImageToolbar = ({ slideObject }: Props) => {
    const { actions } = useContext(CanvasContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (actions && slideObject.id) {
            actions.handleImageUpload(event, slideObject.id);
        }
    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton
                size="small"
                color="primary"
                onClick={handleUploadClick}
            >
                <Upload />
            </IconButton>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
        </Box>
    );
};

export default ImageToolbar;
