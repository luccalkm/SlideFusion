import { ESlideObject, ImageObject, SlideObject } from "../../../types/Entities";
import { ShapeElement } from "../SlideObjects/ObjectTypes/ShapeElement";
import { ImageElement } from "./ObjectTypes/ImageElement";

type Props = {
    slideObject: SlideObject;
};

const CanvasObjectMapper = ({ slideObject }: Props) => {
    switch (slideObject.type) {
        case ESlideObject.Shape:
            return <ShapeElement slideObject={slideObject} />;
        case ESlideObject.Image:
            return <ImageElement imageObject={slideObject as ImageObject} />;
        default:
            return null;
    }
};

export default CanvasObjectMapper;
