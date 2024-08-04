import { useContext, useState } from "react";
import { SlideObject } from "../../../../types/Entities";
import { CanvasContext } from "../../../../context/CanvasContext";
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
} from "@mui/material";
import ColorPickerPopover from "../../../common/ColorPickerPopover";

type Props = {
    slideObject: SlideObject | undefined;
};

export const ShapeToolbar = ({ slideObject }: Props) => {
    const { actions } = useContext(CanvasContext);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const currentColor = slideObject?.backgroundColor;

    const handleOpenColorPicker = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseColorPicker = () => {
        setAnchorEl(null);
    };

    const handleColorChange = (color: string) => {
        if (!slideObject) return;
        actions?.updateObjectAttribute(slideObject.id, "backgroundColor", color);
    };

    const handleDegreeChange = (event: SelectChangeEvent<number>) => {
        if (!slideObject) return;

        const newDegree = parseInt(event.target.value as string, 10);

        actions?.updateObjectAttribute(slideObject.id, "roundedDegree", newDegree);
    };

    const handleSizeChange = (axis: "width" | "height") => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!slideObject) return;

        const newValue = parseFloat(event.target.value) || 0;

        actions?.updateObjectAttribute(slideObject.id, "size", {
            ...slideObject.size,
            [axis]: newValue,
        });
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
                padding: "8px",
            }}
        >
            <Tooltip title={"Color"}>
                <Button
                    onMouseEnter={(e) => e.preventDefault()}
                    onClick={handleOpenColorPicker}
                    sx={{
                        border: "1px solid #cecece",
                        backgroundColor: currentColor,
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        minWidth: "auto",
                        padding: 0,
                    }}
                />
            </Tooltip>
            <ColorPickerPopover
                anchorEl={anchorEl}
                color={currentColor!}
                onClose={handleCloseColorPicker}
                onColorChange={handleColorChange}
            />
            <FormControl size="small" variant="outlined" sx={{ minWidth: "100px" }}>
                <InputLabel id="rounded-degree-label">Rounded</InputLabel>
                <Select
                    size="small"
                    labelId="rounded-degree-label"
                    label="Rounded"
                    value={slideObject?.roundedDegree || 0}
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
                value={slideObject?.size?.width || ""}
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
                value={slideObject?.size?.height || ""}
                onChange={handleSizeChange("height")}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
            />
        </Box>
    );
};

export default ShapeToolbar;
