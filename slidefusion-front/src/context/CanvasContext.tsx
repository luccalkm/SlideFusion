import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Canvas, ESlideObject, ImageObject, Slide, SlideObject } from '../types/Entities';

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
        updateObjectAttribute: <K extends keyof SlideObject>(objectId: string, key: K, value: SlideObject[K]) => void;
        removeSlide: (id: number) => void;
        clearData: () => void;        
        handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>, objectId?: string) => void;
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
            const slide = prevCanvasData.slides[selectedSlideIndex];
            const updatedSlideObjects = slide.slideObjects!.filter((object) => object.id !== objectId);
            const updatedSlide = { ...slide, slideObjects: updatedSlideObjects };
            const updatedSlides = [...prevCanvasData.slides];
            updatedSlides[selectedSlideIndex] = updatedSlide;
            return { ...prevCanvasData, slides: updatedSlides };
        });
    };

    const updateObjectAttribute = <K extends keyof SlideObject>(objectId: string, key: K, value: SlideObject[K]) => {
        setCanvasData((prevCanvasData) => {
            const slide = prevCanvasData.slides[selectedSlideIndex];
            const objectIndex = slide.slideObjects!.findIndex((object) => object.id === objectId);

            if (objectIndex !== -1) {
                const updatedObject = {
                    ...slide.slideObjects![objectIndex],
                    [key]: value
                };

                const updatedSlideObjects = [...slide.slideObjects!];
                updatedSlideObjects[objectIndex] = updatedObject;

                const updatedSlide = { ...slide, slideObjects: updatedSlideObjects };
                const updatedSlides = [...prevCanvasData.slides];
                updatedSlides[selectedSlideIndex] = updatedSlide;

                return { ...prevCanvasData, slides: updatedSlides };
            }

            return prevCanvasData;
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
                const updatedSlides = prevState.slides
                    .filter((_, i) => i !== id)
                    .map((slide, index) => ({
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
        console.log(storedCanvasData);
        if (storedCanvasData !== null) {
            setCanvasData(JSON.parse(storedCanvasData));
            setSelectedSlideIndex(selectedSlideIndex || 0);
        } else {
            createNewCanvas();
        }
        setIsLoaded(true);
    };

    const duplicateSlideObject = (objectId: string) => {
        setCanvasData((prevCanvasData: Canvas) => {
            const slide = prevCanvasData.slides[selectedSlideIndex];
            const objectToDuplicate = slide.slideObjects!.find((object) => object.id === objectId);

            if (objectToDuplicate) {
                const duplicatedObject: SlideObject = {
                    ...objectToDuplicate,
                    id: uuidv4(),
                    position: { x: objectToDuplicate.position.x + 10, y: objectToDuplicate.position.y + 10 },
                    depth: 1
                };

                const updatedSlideObjects = [...slide.slideObjects!, duplicatedObject];
                const updatedSlide = { ...slide, slideObjects: updatedSlideObjects };
                const updatedSlides = [...prevCanvasData.slides];
                updatedSlides[selectedSlideIndex] = updatedSlide;

                return { ...prevCanvasData, slides: updatedSlides };
            }

            return prevCanvasData;
        });
    }

    const clearData = () => {
        sessionStorage.removeItem('canvasData');
        setCanvasData({} as Canvas);
        setIsLoaded(false);
    };
    
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, objectId?: string) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string' && canvasData?.slides) {
                    const img = new Image();
                    img.src = reader.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const maxWidth = 800; 
                        const maxHeight = 800; 
                        let width = img.width;
                        let height = img.height;
                        
                        if (width > height) {
                            if (width > maxWidth) {
                                height = Math.round((height *= maxWidth / width));
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width = Math.round((width *= maxHeight / height));
                                height = maxHeight;
                            }
                        }
    
                        canvas.width = width;
                        canvas.height = height;
    
                        if (ctx) {
                            ctx.drawImage(img, 0, 0, width, height);
                            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); 
                            setCanvasData((prevState) => {
                                const updatedSlides = [...prevState.slides];
                                
                                if (objectId) {
                                    const objectIndex = canvasData.slides[selectedSlideIndex].slideObjects!.findIndex(obj => obj.id === objectId);
                                    if (objectIndex !== -1) {
                                        updatedSlides[selectedSlideIndex].slideObjects![objectIndex] = {
                                            ...canvasData.slides[selectedSlideIndex].slideObjects![objectIndex],
                                            backgroundImageUrl: compressedDataUrl,
                                        } as ImageObject;
                                    }
                                }
        
                                return { ...prevState, slides: updatedSlides };
                            });
                        }
                    };
                }
            };
            reader.readAsDataURL(file);
        }
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
                updateObjectAttribute,
                handleImageUpload,
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
