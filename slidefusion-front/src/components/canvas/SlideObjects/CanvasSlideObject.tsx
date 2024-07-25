import { Box } from "@mui/material";
import React, { useState, useEffect } from 'react';
import ResizableDraggable from "../../common/canvas/objects/ResizableDraggable";

type Props = {
    index: number;
    setSelectedObject: (index: number) => void;
    selectedObject: number | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any;
    updateObjectPosition: (objectId: string, newPosition: { x: number, y: number }, newSize?: { width: number, height: number }) => void;
};

export const CanvasSlideObject = ({ index, setSelectedObject, selectedObject, object, updateObjectPosition }: Props) => {
    const [canvasPosition, setCanvasPosition] = useState(object.position || { x: 10 * index, y: 10 * index });
    const [size, setSize] = useState(object.size || { width: 100, height: 50 });

    const handleDrag = (newPosition: { x: number, y: number }) => {
        setCanvasPosition(newPosition);
        updateObjectPosition(object.id, newPosition);
    };

    const handleResize = (newSize: { width: number, height: number }) => {
        setSize(newSize);
        updateObjectPosition(object.id, canvasPosition, newSize);
    };

    useEffect(() => {
        setCanvasPosition(object.position);
        setSize(object.size);
    }, [object.position, object.size]);

    return (
        <ResizableDraggable
            initialPosition={canvasPosition}
            initialSize={size}
            onDrag={handleDrag}
            onResize={handleResize}
            isSelected={selectedObject === index}
            onClick={() => setSelectedObject(index)}
        >
            <Box
                width={size.width}
                height={size.height}
                sx={{ backgroundColor: 'black' }}
            />
        </ResizableDraggable>
    );
};

export default CanvasSlideObject;
