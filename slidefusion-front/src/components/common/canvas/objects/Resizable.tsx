import React, { useState, useEffect } from 'react';

type ResizableProps = {
    children: React.ReactNode;
    initialSize: { width: number, height: number };
    onResize: (size: { width: number, height: number }) => void;
};

const Resizable = ({ children, initialSize, onResize }: ResizableProps) => {
    const [size, setSize] = useState(initialSize);
    const [isHandleVisible, setIsHandleVisible] = useState(false);

    const handleMouseDown = (event: React.MouseEvent) => {
        event.stopPropagation();
        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const doDrag = (dragEvent: MouseEvent) => {
            const newWidth = startWidth + dragEvent.clientX - startX;
            const newHeight = startHeight + dragEvent.clientY - startY;

            setSize({ width: newWidth, height: newHeight });
            onResize({ width: newWidth, height: newHeight });
        };

        const stopDrag = () => {
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
        };

        window.addEventListener('mousemove', doDrag);
        window.addEventListener('mouseup', stopDrag);
    };

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsHandleVisible(true);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setIsHandleVisible(false);
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div onClick={handleClick} style={{ ...size, position: 'absolute', display: 'inline-block' }}>
            {children}
            {isHandleVisible && (
                <div
                    onMouseDown={handleMouseDown}
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'gray',
                        position: 'absolute',
                        right: '-10px',
                        bottom: '-10px',
                        cursor: 'se-resize'
                    }}
                />
            )}
        </div>
    );
};

export default Resizable;