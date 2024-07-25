import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Canvas, Slide } from '../utils/types/Entities';

export const CanvasContext = createContext<ICanvasContext>({});

export interface ICanvasContext {
    state?: {
        canvasData: Canvas;
        isLoaded: boolean;
        selectedSlideIndex: number;
        smallObjectSize: { width: number, height: number };
    };
    actions?: {
        setCanvasData: React.Dispatch<React.SetStateAction<Canvas>>;
        createNewCanvas: () => void;
        loadCanvasDataFromSession: () => void;
        setSelectedSlideIndex: (index: number) => void;
        updateObjectPosition: (objectId: string, newPosition: { x: number, y: number }, newSize?: { width: number, height: number }) => void;
        clearData: () => void;
        setSmallObjectSize: (size: { width: number, height: number }) => void;
    };
}

type CanvasProviderProps = {
    children: React.ReactNode;
};

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
    const [canvasData, setCanvasData] = useState<Canvas>(() => {
        const storedCanvasData = sessionStorage.getItem('canvasData');
        return storedCanvasData ? JSON.parse(storedCanvasData) : {} as Canvas;
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
    const [smallObjectSize, setSmallObjectSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (isLoaded) {
            sessionStorage.setItem('canvasData', JSON.stringify(canvasData));
        }
    }, [canvasData, isLoaded]);

    const createNewCanvas = () => {
        if (!sessionStorage.getItem('canvasData')) {
            const newCanvas: Canvas = {
                id: uuidv4(),
                title: 'Nova apresentação',
                slides: [
                    {
                        id: uuidv4(),
                        order: 0,
                        backgroundColor: '#ffffff',
                        backgroundImageUrl: '',
                        slideObjects: []
                    }
                ] as Slide[]
            };
            setSelectedSlideIndex(0);
            setCanvasData(newCanvas);
            setIsLoaded(true);
        }
    };

    const updateObjectPosition = (objectId: string, newPosition: { x: number, y: number }, newSize?: { width: number, height: number }) => {
        setCanvasData((prevCanvasData) => {
            const updatedSlides = prevCanvasData.slides.map((slide, index) => {
                if (index === selectedSlideIndex) {
                    return {
                        ...slide,
                        slideObjects: slide?.slideObjects?.map((object) =>
                            object.id === objectId ? { ...object, position: newPosition, size: newSize || object.size } : object
                        )
                    };
                }
                return slide;
            });
            return {
                ...prevCanvasData,
                slides: updatedSlides
            };
        });
    };

    const loadCanvasDataFromSession = () => {
        const storedCanvasData = sessionStorage.getItem('canvasData');
        if (storedCanvasData) {
            setCanvasData(JSON.parse(storedCanvasData));
            setSelectedSlideIndex(selectedSlideIndex || 0);
        } else {
            createNewCanvas();
        }
        setIsLoaded(true);
    };

    const clearData = () => {
        sessionStorage.removeItem('canvasData');
        setCanvasData({} as Canvas);
        setIsLoaded(false);
    };

    return (
        <CanvasContext.Provider value={{
            state: { canvasData, isLoaded, selectedSlideIndex, smallObjectSize },
            actions: { setCanvasData, createNewCanvas, loadCanvasDataFromSession, setSelectedSlideIndex, updateObjectPosition, clearData, setSmallObjectSize }
        }}>
            {children}
        </CanvasContext.Provider>
    );
};

