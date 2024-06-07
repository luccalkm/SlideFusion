export enum ESlideObject {
    Text = "Text",
    Image = "Image",
    Video = "Video",
    Shape = "Shape"
}

export interface SlideObject {
    id: string;
    type: ESlideObject;
    order: number;
    x: number;
    y: number;
    width: number;
    height: number;
    backgroundColor: string;
    backgroundImageUrl?: string;
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
