import { Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const MainBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `120px`,
  marginTop: `32px`,
}));

type Props = {}

export default function MainContent({}: Props) {
  return (
    <MainBox component="main">
      <Toolbar />
      <Typography paragraph>
        LALALA
      </Typography>
    </MainBox>
  );
}
