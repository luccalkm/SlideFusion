import styled from "@emotion/styled";
import { AddOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import React from 'react';

type Props = {
    onClick?: () => void;
};

const StyledBox = styled(Box)<Props>`
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    background: #640D6B;
    position: sticky;
    min-height: 3rem;
    min-width: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    margin: 5px;
    margin: 20px auto 5px auto;
`;

export const AddSlideButton = ({onClick}: Props) => {
  return (
    <StyledBox onClick={onClick}>
        <AddOutlined sx={{ color: '#fff' }} />
    </StyledBox>
  );
};

export default AddSlideButton;