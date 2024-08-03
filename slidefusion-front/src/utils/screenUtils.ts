import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type SlideSizeConfig = {
    [key: string]: { w: number; h: number; };
} & { [key: string]: number };

export const useSlideSize = (config: SlideSizeConfig) => {
    const theme = useTheme();

    const screenSizes = Object.keys(config).sort((a, b) =>
        theme.breakpoints.values[a as keyof typeof theme.breakpoints.values] - theme.breakpoints.values[b as keyof typeof theme.breakpoints.values]
    );

    let slideSize = config[screenSizes[0]];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMatchedArray = screenSizes.map((size) => useMediaQuery(theme.breakpoints.up(size as Breakpoint)));
    
    for (let i = 0; i < screenSizes.length; i++) {
        if (isMatchedArray[i]) {
            slideSize = config[screenSizes[i]];
        } else {
            break;
        }
    }

    return slideSize;
};
