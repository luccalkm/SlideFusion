import { Box, Grid, Typography } from '@mui/material';
import HomeButtons from "../../home/HomeButtons.tsx";
import PresentationList from "../../home/PresentationList";
import NoPresentation from "../../animations/NoPresentation.tsx";

type Props = {
    presentations: Presentation[];
};

export default function Home({ presentations }: Props) {
    return (
        <Grid container alignItems={'flex-start'}>
            <Grid
                xs={8}
                item
                container
                gap={5}
            >
                <HomeButtons />
            </Grid>
            <Grid
                xs={4}
                item
            >
                <Typography variant="h5">
                    Últimas galerias
                </Typography>
                {presentations.length
                    ? (
                        <PresentationList presentations={presentations} />
                    ) : (
                        <Box
                            marginTop={5}
                            flexDirection={'column'}
                            gap={5}
                            display={'flex'}
                            alignItems={'flex-start'}
                        >
                            <Typography>
                                Nenhuma galeria encontrada
                            </Typography>
                            <NoPresentation
                                width={300}
                                height={300}
                                radius={'25%'}
                            />
                        </Box>
                    )
                }
            </Grid>
        </Grid>
    );
}

