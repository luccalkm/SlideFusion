import { useContext, useState } from "react";
import { ChartObject, ImageObject, SlideObject, TextObject } from "../../../../types/Entities";
import { CanvasContext } from "../../../../context/CanvasContext";
import { Box, Button, Tooltip } from "@mui/material";
import ColorPickerPopover from "../../../common/ColorPickerPopover";

type Props = {
  slideObject: SlideObject;
};

type ExcludeImage = Exclude<SlideObject, ImageObject | TextObject | ChartObject>

export const ShapeToolbar = ({ slideObject }: Props) => {
  const { actions } = useContext(CanvasContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const currentColor = (slideObject as ExcludeImage).backgroundColor;

  const handleOpenColorPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseColorPicker = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color: string) => {
    actions?.updateObjectAttribute(slideObject.id, "backgroundColor", color);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
          onMouseEnter={(e) => e.preventDefault()}
    >
      <Tooltip title="Color">
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
            "&:hover": {
              backgroundColor: currentColor,
            },
          }}
        />
      </Tooltip>
      <ColorPickerPopover
        anchorEl={anchorEl}
        color={currentColor}
        onClose={handleCloseColorPicker}
        onColorChange={handleColorChange}
      />
    </Box>
  );
};

export default ShapeToolbar;
