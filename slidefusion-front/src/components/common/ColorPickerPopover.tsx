import { Popover } from "@mui/material";
import { SketchPicker, ColorResult } from 'react-color';

type Props = {
    anchorEl: HTMLElement | null;
    color: string;
    onClose: () => void;
    onColorChange: (color: string) => void;
};

const ColorPickerPopover = ({ anchorEl, color, onClose, onColorChange }: Props) => {
    
    const handleColorChange = (color: ColorResult) => {
        onColorChange(color.hex);
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{ marginTop: '20px' }}
        >
            <SketchPicker color={color} onChange={handleColorChange} />
        </Popover>
    );
};

export default ColorPickerPopover;
