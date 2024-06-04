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
}

export interface Slide {
    id: string;
    order: number;
    slideObjects: SlideObject[];
}

export interface Canvas {
    id: string;
    title: string;
    slides: Slide[];
    backgroundColor: string;
    backgroundImage: string;
    width: number;
    height: number;
}
