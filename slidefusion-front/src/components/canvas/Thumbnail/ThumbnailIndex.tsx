import React from 'react';
import { IconButton } from '@mui/material';

type ThumbnailIndexProps = {
    index: number;
};

const ThumbnailIndex: React.FC<ThumbnailIndexProps> = ({ index }) => {
    return (
        <IconButton
            size="small"
            sx={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                backgroundColor: 'white',
                color: 'black',
                width: '1.5rem',
                height: '1.5rem',
                margin: '0.2rem',
                boxShadow: "0px 0px 4px #000",
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: "0px 0px 8px rgba(0,0,0,0.7)"
                }
            }}
        >
            {index + 1}
        </IconButton>
    );
};

export default ThumbnailIndex;
