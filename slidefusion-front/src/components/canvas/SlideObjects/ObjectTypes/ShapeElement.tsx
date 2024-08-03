import { Box } from "@mui/material";
import { SlideObject } from "../../../../types/Entities";

type Props = {
    slideObject: SlideObject;
};

export const ShapeElement = ({ slideObject }: Props) => {
    const { size, backgroundColor, roundedDegree } = slideObject;
    return (
        <div>
            <Box
                width={size.width}
                height={size.height}
                sx={{ 
                    borderRadius: `${roundedDegree}%`,
                    backgroundColor, 
                    cursor: "pointer"
                 }}
            />
        </div>
    );
};

export default ShapeElement;
