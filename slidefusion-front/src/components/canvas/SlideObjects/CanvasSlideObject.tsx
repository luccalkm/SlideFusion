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
    const [canvasPosition, setCanvasPosition] = useState(slideObject.position);
    const [size, setSize] = useState(slideObject.size);

    const handleDrag = (newPosition: { x: number; y: number }) => {
        setCanvasPosition(newPosition);
        actions?.updateObjectAttribute(slideObject.id, 'position', newPosition);
    };

    const handleResize = (newSize: { width: number; height: number }) => {
        setSize(newSize);
        actions?.updateObjectAttribute(slideObject.id, 'size', newSize);
    };

    useEffect(() => {
        if (slideObject.position !== canvasPosition) {
            setCanvasPosition(slideObject.position);
        }
        if (slideObject.size !== size) {
            setSize(slideObject.size);
        }
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
                <CanvasObjectMapper
                    slideObject={slideObject}
                />
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
