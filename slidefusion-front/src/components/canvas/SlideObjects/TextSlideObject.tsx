import { Typography } from "@mui/material";
import React from 'react';
import { ESlideObject, TextObject } from "../../../utils/types/Entities";
import CanvasSlideObject from "../CanvasSlideObject";

type Props = {
    object: TextObject;
    slideSize?: { width: number, height: number };
};

const TextSlideObject = ({ object }: Props) => {

    const { position, fontFamily, fontSize, fontWeight, italic, color, content, id } = object;

    const treatMiniSlide = (slideSize: { x: number, y: number }) => {
        return { x: slideSize.x / 4, y: slideSize.y / 4.5 };
    }

    return (
        <CanvasSlideObject
            objectId={id}
            type={ESlideObject.Text}
            position={treatMiniSlide(position)}
        >
            <Typography
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontStyle={italic ? 'italic' : 'normal'}
                color={color}
            >
                {content}
            </Typography>
        </CanvasSlideObject>
    );
};

export default TextSlideObject;
