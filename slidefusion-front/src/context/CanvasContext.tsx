import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Canvas, Slide, SlideObject } from '../types/Entities';

export const CanvasContext = createContext<ICanvasContext>({});

export interface ICanvasContext {
    state?: {
        canvasData: Canvas;
        isLoaded: boolean;
        selectedSlideIndex: number;
    };
    actions?: {
        duplicateSlideObject?: (objectId: string) => void; 
        removeSlideObject?: (objectId: string) => void;
        setCanvasData: React.Dispatch<React.SetStateAction<Canvas>>;
        createNewCanvas: () => void;
        loadCanvasDataFromSession: () => void;
        setSelectedSlideIndex: (index: number) => void;
        updateObjectSizeOrPosition: (objectId: string, newPosition: { x: number, y: number }, newSize?: { width: number, height: number }) => void;
        updateObjectColor: (objectId: string, newColor: string) => void;
        removeSlide: (id: number) => void;
        clearData: () => void;
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

    useEffect(() => {
        if (isLoaded) {
            sessionStorage.setItem('canvasData', JSON.stringify(canvasData));
        }
    }, [canvasData, isLoaded]);

    const createNewCanvas = () => {
        if (!sessionStorage.getItem('canvasData')) {
            const newCanvas: Canvas = {
                id: uuidv4(),
                title: '',
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

    const removeSlideObject = (objectId: string) => {
        setCanvasData((prevCanvasData) => {
            const updatedSlides = prevCanvasData.slides.map((slide, index) => {
                if (index === selectedSlideIndex) {
                    return {
                        ...slide,
                        slideObjects: slide.slideObjects!.filter((object) => object.id !== objectId)
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

    const updateObjectSizeOrPosition = (objectId: string, newPosition: { x: number, y: number }, newSize?: { width: number, height: number }) => {
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

    const updateObjectColor = (objectId: string, newColor: string) => {
        setCanvasData((prevCanvasData) => {
            const updatedSlides = prevCanvasData.slides.map((slide, index) => {
                if (index === selectedSlideIndex) {
                    return {
                        ...slide,
                        slideObjects: slide?.slideObjects?.map((object) =>
                            object.id === objectId ? { ...object, backgroundColor: newColor } : object
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

    const removeSlide = (id: number) => {
        setCanvasData((prevState) => {
            if (prevState.slides.length === 1) {
                const newSlide: Slide = {
                    id: uuidv4(),
                    order: 0,
                    backgroundColor: '#fff',
                    backgroundImageUrl: '',
                    slideObjects: []
                };
                setSelectedSlideIndex(0);
                return {
                    ...prevState,
                    slides: [newSlide]
                };
            } else {
                const updatedSlides = prevState.slides.filter((_, i) => i !== id).map((slide, index) => ({
                    ...slide,
                    order: index
                }));
                const newSelectedSlideIndex = id === prevState.slides.length - 1 ? id - 1 : id;
                setSelectedSlideIndex(newSelectedSlideIndex);
                return {
                    ...prevState,
                    slides: updatedSlides
                };
            }
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

    const duplicateSlideObject = (objectId: string) => {
        setCanvasData((prevCanvasData: Canvas) => {
            const updatedSlides = prevCanvasData.slides.map((slide) => {
                if (slide.id === prevCanvasData.slides[selectedSlideIndex].id) {
                    const objectToDuplicate = slide.slideObjects!.find((object) => object.id === objectId);
                    if (objectToDuplicate) {
                        const duplicatedObject: SlideObject = {
                            ...objectToDuplicate,
                            id: uuidv4(),
                            position: { x: objectToDuplicate.position.x + 10, y: objectToDuplicate.position.y + 10 },
                            depth: 1
                        };
                        return {
                            ...slide,
                            slideObjects: [...slide.slideObjects!, duplicatedObject]
                        };
                    }
                }
                return slide;
            });
            return {
                ...prevCanvasData,
                slides: updatedSlides
            };
        });
    }

    const clearData = () => {
        sessionStorage.removeItem('canvasData');
        setCanvasData({} as Canvas);
        setIsLoaded(false);
    };

    return (
        <CanvasContext.Provider value={{
            state: { 
                canvasData, 
                isLoaded, 
                selectedSlideIndex 
            },
            actions: { 
                setCanvasData, 
                createNewCanvas, 
                loadCanvasDataFromSession, 
                setSelectedSlideIndex, 
                updateObjectSizeOrPosition, 
                updateObjectColor, 
                removeSlide, 
                clearData,
                removeSlideObject,
                duplicateSlideObject
            }
        }}>
            {children}
        </CanvasContext.Provider>
    );
};
