import { Box } from "@mui/material";
import { styled } from "@mui/system";

type SlideProps = {
    backgroundColor?: string;
    backgroundImageUrl?: string;
    mini?: boolean;
    editable?: boolean;
    testContent: string;
    onClick?: () => void;
};

const StyledBox = styled(Box)<SlideProps>`
    background-color: ${props => props.backgroundColor};
    background-image: url(${props => props.backgroundImageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid #b0b0b0;
    position: relative;
    display: flex;
    transform: ${props => props.mini ? 'scale(0.8)' : 'none'};
    transform-origin: top left;
    transition: transform 0.3s ease-in-out;

    ${props => props.mini && `
        &:hover {
            box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
            border-color: #808080;
        }
    `}
`;

export default function Slide({ onClick, backgroundColor, backgroundImageUrl, mini, editable, testContent }: SlideProps) {
    return (
        <StyledBox
            onClick={onClick}
            testContent={testContent}
            backgroundColor={backgroundColor}
            backgroundImageUrl={backgroundImageUrl}
            mini={mini}
            editable={editable}
        >
            {testContent}
        </StyledBox>
    );
}
