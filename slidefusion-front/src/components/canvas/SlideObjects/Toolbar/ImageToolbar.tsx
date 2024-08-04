import { useContext, useRef, useState } from "react";
import { ImageObject } from "../../../../types/Entities";
import { CanvasContext } from "../../../../context/CanvasContext";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { Upload, FitScreen, AspectRatio, Repeat, RepeatOne, RepeatOneOnOutlined, Crop, RepeatOn, CenterFocusStrong, Flip, FlipCameraAndroid, FlipCameraIos } from "@mui/icons-material";

type Props = {
    slideObject: ImageObject;
};

export const ImageToolbar = ({ slideObject }: Props) => {
    const { actions } = useContext(CanvasContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // States to track current styles
    const [currentSize, setCurrentSize] = useState(slideObject.backgroundSize || 'contain');
    const [currentRepeat, setCurrentRepeat] = useState(slideObject.backgroundRepeat || 'no-repeat');
    const [currentPosition, setCurrentPosition] = useState(slideObject.backgroundPosition || 'center');

    // Cycle options for each style
    const sizeOptions: { value: string, icon: JSX.Element }[] = [
        { value: "contain", icon: <FitScreen /> },
        { value: "cover", icon: <AspectRatio /> },
        { value: "auto", icon: <Crop /> },
        { value: "100% 100%", icon: <CenterFocusStrong /> },
    ];

    const repeatOptions: { value: string, icon: JSX.Element }[] = [
        { value: "no-repeat", icon: <RepeatOne /> },
        { value: "repeat", icon: <Repeat /> },
        { value: "repeat-x", icon: <RepeatOn /> },
        { value: "repeat-y", icon: <RepeatOneOnOutlined /> },
    ];

    const positionOptions: { value: string, icon: JSX.Element }[] = [
        { value: "center", icon: <CenterFocusStrong /> },
        { value: "top", icon: <Flip /> },
        { value: "bottom", icon: <FlipCameraAndroid /> },
        { value: "left", icon: <FlipCameraIos /> },
        { value: "right", icon: <FlipCameraIos sx={{ transform: "rotate(180deg)" }} /> },
        { value: "top left", icon: <Flip sx={{ transform: "rotate(180deg)" }} /> },
        { value: "top right", icon: <Flip sx={{ transform: "rotate(90deg)" }} /> },
        { value: "bottom left", icon: <Flip sx={{ transform: "rotate(270deg)" }} /> },
        { value: "bottom right", icon: <Flip sx={{ transform: "rotate(360deg)" }} /> },
    ];

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (actions && slideObject.id) {
            actions.handleImageUpload(event, slideObject.id);
        }
    };

    const cycleOption = <T extends { value: string; icon: JSX.Element }>(
        current: string,
        options: T[],
        setState: React.Dispatch<React.SetStateAction<string>>,
        styleKey: keyof ImageObject
    ) => {
        const currentIndex = options.findIndex((option) => option.value === current);
        const nextIndex = (currentIndex + 1) % options.length;
        const nextOption = options[nextIndex];

        setState(nextOption.value);
        actions!.updateObjectAttribute(slideObject.id, styleKey , nextOption.value);
    };

    const capitalizeFirstLetter = (string: string) => {
        if (string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <Box display="flex" alignItems="center">
            <Tooltip title="Upload Image">
                <IconButton
                    size="small"
                    color="primary"
                    onClick={handleUploadClick}
                >
                    <Upload />
                </IconButton>
            </Tooltip>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <Divider sx={{ marginX: 1 }} orientation="vertical" flexItem />

            <Tooltip title={capitalizeFirstLetter(currentSize)}>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => cycleOption(currentSize, sizeOptions, setCurrentSize, 'backgroundSize')}
                >
                    {sizeOptions.find(option => option.value === currentSize)?.icon}
                </IconButton>
            </Tooltip>

            <Tooltip title={capitalizeFirstLetter(currentRepeat)}>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => cycleOption(currentRepeat, repeatOptions, setCurrentRepeat, 'backgroundRepeat')}
                >
                    {repeatOptions.find(option => option.value === currentRepeat)?.icon}
                </IconButton>
            </Tooltip>

            <Tooltip title={capitalizeFirstLetter(currentPosition)}>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => cycleOption(currentPosition, positionOptions, setCurrentPosition, 'backgroundPosition')}
                >
                    {positionOptions.find(option => option.value === currentPosition)?.icon}
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default ImageToolbar;
