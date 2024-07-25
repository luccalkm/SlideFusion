import React, { useState, useRef, useEffect, useCallback } from 'react';

type DraggableProps = {
    children: React.ReactNode;
    onDrag: (position: { x: number, y: number; }) => void;
};

const Draggable = ({ children, onDrag }: DraggableProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const targetElement = useRef<HTMLElement | null>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        const element = event.currentTarget as HTMLElement;
        const elementRect = element.getBoundingClientRect();
        dragOffset.current = {
            x: event.clientX - elementRect.left,
            y: event.clientY - elementRect.top
        };
        setIsDragging(true);
        targetElement.current = element;
    };

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!isDragging || !targetElement.current) return;

        const parent = targetElement.current.parentNode as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        const elementRect = targetElement.current.getBoundingClientRect();

        const x = event.clientX - parentRect.left - dragOffset.current.x;
        const y = event.clientY - parentRect.top - dragOffset.current.y;

        const newX = Math.max(0, Math.min(x, parentRect.width - elementRect.width));
        const newY = Math.max(0, Math.min(y, parentRect.height - elementRect.height));

        onDrag({ x: newX, y: newY });
    }, [isDragging, onDrag]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        targetElement.current = null;
    }, []);

    useEffect(() => {
        if (isDragging) {
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
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            {children}
        </div>
    );
};

export default Draggable;
