import { Box, styled } from "@mui/material";

export const MainBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(5),
    marginLeft: `32px`,
    marginTop: `64px`,
}));