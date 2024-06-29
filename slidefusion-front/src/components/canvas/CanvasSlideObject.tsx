import React, { useContext, useEffect, useState } from 'react';
import { ESlideObject } from "../../utils/types/Entities";
import { Box } from "@mui/material";
import { CanvasContext } from "../../context/CanvasContext";

type Props = {
    children?: React.ReactNode;
    position: { x: number, y: number };
    size?: { width: number, height: number };
    backgroundColor?: string;
    type: ESlideObject;
    objectId: string;
    scale?: number;
};

const CanvasSlideObject = ({ children, position, objectId, scale = 1 }: Props) => {
    const { actions } = useContext(CanvasContext);
    const [dragging, setDragging] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(position);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
        event.dataTransfer.setData("text/plain", "");
        setDragging(true);
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        setDragging(false);
        const parentRect = event.currentTarget.parentElement?.getBoundingClientRect();
        if (parentRect) {
            const newPosition = {
                x: (event.clientX - parentRect.left - offset.x) / scale,
                y: (event.clientY - parentRect.top - offset.y) / scale
            };
            console.log(newPosition);
            setCurrentPosition(newPosition);
        }
    };

    useEffect(() => {
        setCurrentPosition(position);
    }, [position]);

    useEffect(() => {
        if (!dragging) {
            actions?.updateObjectPosition(objectId, currentPosition);
        }
    }, [currentPosition, dragging, actions, objectId]);


    return (
        <Box
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            position={'absolute'}
            top={currentPosition.y}
            left={currentPosition.x}
            sx={{ overflow: 'hidden'}}
        >
            {children}
        </Box>
    );
};

export default CanvasSlideObject;
