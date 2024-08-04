export enum ESlideObject {
    Text = "Text",
    Image = "Image",
    Video = "Video",
    Shape = "Shape"
}

interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

export interface TextObject extends SlideObject {
    content: string;
    color: string; 
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    italic: boolean;
    underline: boolean;
    align: string;
}

export interface ImageObject extends SlideObject {
    aspectRatio?: number;
    backgroundImageUrl: string;
}

export interface SlideObject {
    id: string;
    type: ESlideObject;
    depth: number;
    position: Position;
    size: Size;
    backgroundColor: string;
    roundedDegree?: number;
}

export interface Slide {
    id: string;
    order: number;
    backgroundColor: string | undefined;
    backgroundImageUrl?: string | undefined;
    slideObjects?: SlideObject[];
}

export interface Canvas {
    id: string;
    title: string;
    slides: Slide[];
}
