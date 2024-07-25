export enum ESlideObject {
    Text = "Text",
    Image = "Image",
    Video = "Video",
    Shape = "Shape"
}

export interface TextObject extends SlideObject {
    content: string;
    color: string; 
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    italic: boolean;
    underline: boolean;
    align: string;
}

export interface SlideObject {
    id: string;
    type: ESlideObject;
    order: number;
    position: {
        x: number;
        y: number;
    }
    size: {
        width: number;
        height: number;
    }
    backgroundColor: string;
    backgroundImageUrl?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    italic?: boolean;
    color?: string;
    content?: string;
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
