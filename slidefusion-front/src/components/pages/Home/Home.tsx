import { Box, ButtonBase, CardContent, Grid, Icon, Typography } from '@mui/material';
import PresentationList from '../../composite/PresentationMini/PresentationList';
import NoPresentation from "../../composite/animations/NoPresentation";
import { routeItems } from "../../routes/routes.tsx";
import { RouteItem } from "../../../utils/types/RouteItem.ts";
import { Link } from "react-router-dom";
import { MainBox } from "../../layout/General/MainBox.tsx";

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
                {routeItems.map((item: RouteItem) => {
                    return (
                        <ButtonBase
                            key={item?.displayName}
                            component={Link}
                            to={item.link}
                            sx={{
                                gap: 5,
                                padding: 2,
                                display: 'flex',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <CardContent
                                sx={{ display: 'flex', gap: 2 }}
                            >
                                <Icon>
                                    {item?.icon}
                                </Icon>
                                <Typography>
                                    {item?.displayName}
                                </Typography>
                            </CardContent>
                        </ButtonBase>
                    );
                })}
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

