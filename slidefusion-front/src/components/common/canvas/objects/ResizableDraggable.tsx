import { Box } from "@mui/material";
import React, { useState, useRef, useEffect } from 'react';

type ResizableDraggableProps = {
    children: React.ReactNode;
    initialPosition: { x: number, y: number };
    initialSize: { width: number, height: number };
    onDrag: (position: { x: number, y: number }) => void;
    onResize: (size: { width: number, height: number }) => void;
    isSelected: boolean;
    onClick: () => void;
};

const ResizableDraggable = ({ children, initialPosition, initialSize, onDrag, onResize, isSelected, onClick }: ResizableDraggableProps) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });
    const targetElement = useRef<HTMLElement | null>(null);
    const effectTimeout = useRef<number | null>(300);

    const handleMouseDownDrag = (event: React.MouseEvent) => {
        event.stopPropagation();
        const element = event.currentTarget as HTMLElement;
        const elementRect = element.getBoundingClientRect();
        dragOffset.current = {
            x: event.clientX - elementRect.left,
            y: event.clientY - elementRect.top
        };
        setIsDragging(true);
        targetElement.current = element;
    };

    const handleMouseDownResize = (event: React.MouseEvent) => {
        event.stopPropagation();
        resizeStart.current = {
            width: size.width,
            height: size.height,
            x: event.clientX,
            y: event.clientY
        };
        setIsResizing(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (isDragging && targetElement.current) {
            const parent = targetElement.current.parentNode as HTMLElement;
            const parentRect = parent.getBoundingClientRect();
            const elementRect = targetElement.current.getBoundingClientRect();

            const x = event.clientX - parentRect.left - dragOffset.current.x;
            const y = event.clientY - parentRect.top - dragOffset.current.y;

            const newX = Math.max(0, Math.min(x, parentRect.width - elementRect.width));
            const newY = Math.max(0, Math.min(y, parentRect.height - elementRect.height));

            setPosition({ x: newX, y: newY });
            
            if (effectTimeout.current !== null) {
                clearTimeout(effectTimeout.current);
            }
            effectTimeout.current = window.setTimeout(() => {
                onDrag({ x: newX, y: newY });
            }, 300);
        }

        if (isResizing && targetElement.current) {
            const parent = targetElement.current.parentNode as HTMLElement;
            const parentRect = parent.getBoundingClientRect();

            const newWidth = Math.min(resizeStart.current.width + (event.clientX - resizeStart.current.x), parentRect.width - position.x);
            const newHeight = Math.min(resizeStart.current.height + (event.clientY - resizeStart.current.y), parentRect.height - position.y);

            const minWidth = 5;
            const minHeight = 5;

            if (newWidth < minWidth || newHeight < minHeight) {
                return;
            }

            setSize({ width: newWidth, height: newHeight });
            onResize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    useEffect(() => {
        setSize(initialSize);
    }, [initialSize]);

    return (
        <Box
            position={'absolute'}
            top={position.y}
            left={position.x}
            width={size.width}
            height={size.height}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab', 
                outline: isSelected ? '2px dashed gray' : 'none',
                outlineOffset: '-4px'
            }}
            display={'inline-block'}
            onMouseDown={handleMouseDownDrag}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
            {isSelected && (
                <>
                    <Box
                        onMouseDown={handleMouseDownResize}
                        width={'10px'}
                        height={'10px'}
                        position={'absolute'}
                        left={-10}
                        top={-10}
                        style={{ cursor: 'se-resize', backgroundColor: 'gray' }}
                    />
                    <Box
                        onMouseDown={handleMouseDownResize}
                        width={'10px'}
                        height={'10px'}
                        position={'absolute'}
                        right={-10}
                        bottom={-10}
                        style={{ cursor: 'se-resize', backgroundColor: 'gray' }}
                    />
                </>
            )}
        </Box>
    );
};

export default ResizableDraggable;
