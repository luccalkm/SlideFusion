import { useContext } from "react";
import {
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
} from "@mui/material";
import { ESlideObject, SlideObject } from "../../../types/Entities";
import { ShapeToolbar } from "./Toolbar/ShapeToolbar";
import { CanvasContext } from "../../../context/CanvasContext";
import { ArrowDownward, ArrowUpward, ContentCopy, Delete } from "@mui/icons-material";
import ImageToolbar from "./Toolbar/ImageToolbar";

type Props = {
    slideObject: SlideObject;
    setSelectedObject: (index: number | null) => void;
};

export const CanvasObjectToolbar = ({ slideObject, setSelectedObject }: Props) => {
    const { actions, state } = useContext(CanvasContext);

    const handleObjectDelete = () => {
        if (!actions?.removeSlideObject) return;
        actions.removeSlideObject(slideObject.id);
        setSelectedObject(null);
    };

    const handleObjectDuplicate = () => {
        if (!actions?.duplicateSlideObject || !state?.canvasData?.slides) return;
        actions.duplicateSlideObject(slideObject.id);
        const slideObjects = state.canvasData.slides[state.selectedSlideIndex]?.slideObjects;
        if (slideObjects) {
            setSelectedObject(slideObjects.length - 1);
        }
    };

    const handleDepthChange = (amount: number) => {
        const newValue = slideObject.depth + amount;
        if (newValue < 0) return;
        actions?.updateObjectAttribute(slideObject.id, "depth", newValue);
    };

    const handleSizeChange = (axis: "width" | "height") => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = parseFloat(event.target.value) || 0;
        actions?.updateObjectAttribute(slideObject.id, "size", {
            ...slideObject.size,
            [axis]: newValue,
        });
    };

    const handleDegreeChange = (event: SelectChangeEvent<number>) => {
        const newDegree = parseInt(event.target.value as string, 10);
        actions?.updateObjectAttribute(slideObject.id, "roundedDegree", newDegree);
    };

    const renderToolbarOptions = () => {
        switch (slideObject.type) {
            case ESlideObject.Shape:
                return <ShapeToolbar slideObject={slideObject} />;
            case ESlideObject.Image:
                return <ImageToolbar slideObject={slideObject} />;
            default:
                return null;
        }
    };

    return (
        <Grid
            container
            onClick={(e) => e.stopPropagation()}
            position="absolute"
            top="-20%"
            left="50%"
            style={{ transform: "translateX(-50%)" }}
            padding={1}
            bgcolor="white"
            boxShadow={3}
            width="80%"
            zIndex={1}
            display="flex"
            justifyContent="center"
            sx={{ borderRadius: 2 }}
        >
            <Grid item gap={1} mx={2} alignItems={'center'} display={'flex'}>

                <FormControl size="small" variant="outlined" sx={{ minWidth: "100px" }}>
                    <InputLabel id="rounded-degree-label">Rounded</InputLabel>
                    <Select
                        size="small"
                        labelId="rounded-degree-label"
                        label="Rounded"
                        value={slideObject.roundedDegree || 0}
                        onChange={handleDegreeChange}
                        displayEmpty
                        sx={{ color: "black" }}
                    >
                        <MenuItem value={0}>0%</MenuItem>
                        <MenuItem value={5}>5%</MenuItem>
                        <MenuItem value={15}>15%</MenuItem>
                        <MenuItem value={25}>25%</MenuItem>
                        <MenuItem value={35}>35%</MenuItem>
                        <MenuItem value={50}>50%</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    sx={{ width: "100px" }}
                    variant="outlined"
                    label="Width"
                    type="number"
                    size="small"
                    value={slideObject.size.width || ""}
                    onChange={handleSizeChange("width")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">px</InputAdornment>,
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    variant="outlined"
                    label="Height"
                    type="number"
                    size="small"
                    value={slideObject.size.height || ""}
                    onChange={handleSizeChange("height")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">px</InputAdornment>,
                    }}
                />
            </Grid>

            <Divider sx={{ marginX: 1 }} orientation="vertical" flexItem />
            <Grid item display="flex" alignItems="center">
                <Tooltip title="Delete">
                    <IconButton onClick={handleObjectDelete} aria-label="delete" size="small">
                        <Delete fontSize="small" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Duplicate">
                    <IconButton onClick={handleObjectDuplicate} aria-label="duplicate" size="small">
                        <ContentCopy fontSize="small" color="primary" />
                    </IconButton>
                </Tooltip>
                <Divider sx={{ marginX: 1 }} orientation="vertical" flexItem />
                <Grid item>
                    <Tooltip title="Send Backward">
                        <IconButton
                            onClick={() => handleDepthChange(-1)}
                            aria-label="order-down"
                            size="small"
                        >
                            <ArrowDownward fontSize="small" color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Bring Forward">
                        <IconButton
                            onClick={() => handleDepthChange(1)}
                            aria-label="order-up"
                            size="small"
                        >
                            <ArrowUpward fontSize="small" color="primary" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider sx={{ marginX: 1 }} orientation="vertical" flexItem />
            {renderToolbarOptions()}
        </Grid>
    );
};
