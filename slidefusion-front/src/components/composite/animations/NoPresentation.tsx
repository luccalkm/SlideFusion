import React, { useState } from 'react';
import Lottie, { Options } from 'react-lottie';
import noPresentationsAnim from './noPresentations.json';
import { Box } from "@mui/material";

type Props = {
    height: number;
    width: number;
    radius?: string;
};

const NoPresentation: React.FC<Props> = ({ radius = '', height, width }) => {
    const [isStopped, setIsStopped] = useState(true);

    const options: Options = {
        loop: true,
        autoplay: false,
        animationData: noPresentationsAnim,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const handleRadius = (radius: string) => {
        if (radius.length > 0) {
            return radius.includes('%') || radius.includes('px')
                ? radius
                : `${radius}px`;
        }
        return 0;
    };

    return (
        <Box 
            onMouseEnter={() => setIsStopped(false)}
            onMouseLeave={() => setIsStopped(true)}
            sx={{ boxShadow: '0px 3px 5px rgba(0,0,0,0.5)', borderRadius: handleRadius(radius) }}
        >
            <Lottie options={options} height={height} width={width} isStopped={isStopped} />
        </Box>
    );
};

export default NoPresentation;
