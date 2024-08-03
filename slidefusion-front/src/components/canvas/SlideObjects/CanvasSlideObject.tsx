import { useState, useEffect, useContext } from "react";
import ResizableDraggable from "../../common/canvas/objects/ResizableDraggable";
import { SlideObject } from "../../../types/Entities";
import CanvasObjectMapper from "./CanvasObjectMapper";
import { CanvasContext } from "../../../context/CanvasContext";
import { CanvasObjectToolbar } from "./CanvasObjectToolbar";

type Props = {
    index: number;
    setSelectedObject: (index: number | null) => void;
    selectedObject?: number | null;
    slideObject: SlideObject;
};

export const CanvasSlideObject = ({
    index,
    setSelectedObject,
    selectedObject,
    slideObject,
}: Props) => {
    const { actions } = useContext(CanvasContext);
    const [canvasPosition, setCanvasPosition] = useState(slideObject.position || { x: 10 * index, y: 10 * index });
    const [size, setSize] = useState(slideObject.size || { width: 100, height: 50 });

    const handleDrag = (newPosition: { x: number, y: number }) => {
        setCanvasPosition(newPosition);
        actions?.updateObjectSizeOrPosition(slideObject.id, newPosition);
    };

    const handleResize = (newSize: { width: number, height: number }) => {
        setSize(newSize);
        actions?.updateObjectSizeOrPosition(slideObject.id, canvasPosition, newSize);
    };

    useEffect(() => {
        setCanvasPosition(slideObject.position);
        setSize(slideObject.size);
    }, [slideObject.position, slideObject.size]);

    return (
        <>
            <ResizableDraggable
                initialPosition={canvasPosition}
                initialSize={size}
                onDrag={handleDrag}
                onResize={handleResize}
                isSelected={selectedObject === index}
                onClick={() => setSelectedObject(index)}
                objectId={slideObject.id}
            >
                <CanvasObjectMapper slideObject={{ ...slideObject, position: canvasPosition, size }} />
            </ResizableDraggable>
            {selectedObject === index && (
                <CanvasObjectToolbar
                    setSelectedObject={setSelectedObject}
                    slideObject={slideObject}
                />
            )}
        </>
    );
};

export default CanvasSlideObject;
