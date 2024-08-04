// Enum para definir tipos de objetos de slide
export enum ESlideObject {
    Text = "Text",
    Image = "Image",
    Shape = "Shape",
    Chart = "Chart" // Preparado para gráficos futuros
}

// Interfaces para posição e tamanho
interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

// Interface base para objetos de slide
export interface BaseSlideObject {
    id: string;
    type: ESlideObject;
    position: Position;
    size: Size;
    depth: number;
    roundedDegree?: number;
}

// Interface para objetos de texto, com propriedades específicas
export interface TextObject extends BaseSlideObject {
    type: ESlideObject.Text;
    content: string;
    color: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    italic: boolean;
    underline: boolean;
    align: string;
    backgroundColor: string;
}

// Interface para objetos de forma, com propriedades específicas
export interface ShapeObject extends BaseSlideObject {
    type: ESlideObject.Shape;
    backgroundColor: string;
}

// Interface para objetos de imagem, com propriedades específicas
export interface ImageObject extends BaseSlideObject {
    type: ESlideObject.Image;
    aspectRatio?: number;
    backgroundImageUrl?: string;
    backgroundSize ?: string;
    backgroundRepeat ?: string;
    backgroundPosition ?: string;
}

// Interface para futuros objetos de gráfico, com propriedades básicas
export interface ChartObject extends BaseSlideObject {
    type: ESlideObject.Chart;
    // Outros campos específicos para gráficos podem ser adicionados no futuro
}


// Tipo para qualquer objeto de slide
export type SlideObject = TextObject | ShapeObject | ImageObject | ChartObject;

// Interface para representar um slide
export interface Slide {
    id: string;
    order: number;
    backgroundColor?: string;
    backgroundImageUrl?: string;
    slideObjects?: SlideObject[];
}

// Interface para representar um canvas com múltiplos slides
export interface Canvas {
    id: string;
    title: string;
    slides: Slide[];
}
