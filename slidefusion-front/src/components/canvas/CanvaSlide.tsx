import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { ESlideObject, SlideObject, TextObject } from "../../utils/types/Entities";
import TextSlideObject from "./SlideObjects/TextSlideObject";

type SlideProps = {
    backgroundColor?: string;
    backgroundImageUrl?: string;
    mini?: boolean;
    editable?: boolean;
    onClick?: () => void;
    objects?: SlideObject[];
    ref?: React.Ref<HTMLDivElement>;
};

const StyledBox = styled(Box)<SlideProps>`
    background-color: ${props => props.backgroundColor};
    background-image: url(${props => props.backgroundImageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: ${props => props.mini ? '10rem' : '100%'};
    width: 100%;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid #b0b0b0;
    position: relative;
    display: flex;
    transition: transform 0.3s ease-in-out;

    ${props => props.mini && `
        &:hover {
            box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
            border-color: #808080;
        }

        & > * {
            transform: scale(0.75);
            transform-origin: top left;
        }
    `}
`;

const SlideContainer = styled(Box)<{ mini?: boolean }>`    
    height: ${props => props.mini ? '28%' : '100%'};
    width: ${props => props.mini ? '80%' : '100%'};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function CanvaSlide({ ref, onClick, backgroundColor, backgroundImageUrl, mini, editable, objects }: SlideProps) {
    return (
        <SlideContainer mini={mini}>
            <StyledBox
                ref={ref}
                onClick={onClick}
                backgroundColor={backgroundColor}
                backgroundImageUrl={backgroundImageUrl}
                mini={mini}
                editable={editable}
            >
                {objects?.map((object, index) => {
                    if (object.type === ESlideObject.Text) {
                        return (
                            <TextSlideObject 
                                key={index} 
                                object={object as TextObject}
                            />
                        );
                    }
                    return (
                        <div key={index}>ixi n rolou n</div>
                    );
                })}
            </StyledBox>
        </SlideContainer>
    );
}
