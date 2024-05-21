
import { Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const MainBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `240px`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `240px`,
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: `60px`,
  },
}));

type Props = {}

export default function MainContent({}: Props) {
  return (
    <MainBox 
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
    >
        <Toolbar />
        <Typography paragraph>
            LALALA
        </Typography>
    </MainBox>
  );
}
