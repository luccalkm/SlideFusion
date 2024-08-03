import { ESlideObject, SlideObject } from "../../../types/Entities";
import { ShapeElement } from "../SlideObjects/ObjectTypes/ShapeElement";

type Props = {
    slideObject: SlideObject;
};

const CanvasObjectMapper = ({ slideObject }: Props) => {
    switch (slideObject.type) {
        case ESlideObject.Shape:
            return <ShapeElement slideObject={slideObject} />;
        default:
            return null;
    }
};

export default CanvasObjectMapper;
