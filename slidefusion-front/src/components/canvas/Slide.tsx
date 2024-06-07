import { Box } from "@mui/material";
import { styled } from "@mui/system";

type SlideProps = {
    backgroundColor: string | undefined;
    backgroundImageUrl: string | undefined;
    mini?: boolean;
    editable?: boolean;
    testContent: string;
};

const StyledBox = styled(Box)<SlideProps>`
    background-color: ${props => props.backgroundColor};
    background-image: url(${props => props.backgroundImageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: ${props => props.mini ? '28%' : '100%'};
    minHeight: ${props => props.mini ? '10rem' : '100%'};
    width: ${props => props.mini ? '80%': '100%'};
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid #b0b0b0;
    position: relative;
    display: flex;
`;

export default function Slide({ backgroundColor, backgroundImageUrl, mini, editable, testContent}: SlideProps) {
    return (
        <StyledBox
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
