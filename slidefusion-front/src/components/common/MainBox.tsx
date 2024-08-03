import { Box, styled } from "@mui/material";

export const MainBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    marginLeft: `32px`,
    marginTop: `64px`,
}));