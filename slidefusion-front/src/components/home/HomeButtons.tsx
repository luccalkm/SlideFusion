import { useContext } from "react";
import { ButtonBase, CardContent, Icon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CanvasContext } from "../../context/CanvasContext";
import { AccountBox, ImageSearch, PostAdd } from "@mui/icons-material";

const HomeButtons = () => {
    const { actions } = useContext(CanvasContext);
    
    return (
        <>
            <ButtonBase
                component={Link}
                to="/gallery"
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
                        <ImageSearch />
                    </Icon>
                    <Typography>
                        Galeria
                    </Typography>
                </CardContent>
            </ButtonBase>
            <ButtonBase
                onClick={actions?.createNewCanvas}
                component={Link}
                to="/create-presentation"
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
                        <PostAdd />
                    </Icon>
                    <Typography>
                        Criar apresentação
                    </Typography>
                </CardContent>
            </ButtonBase>
            <ButtonBase
                component={Link}
                to="/profile"
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
                        <AccountBox />
                    </Icon>
                    <Typography>
                        Perfil
                    </Typography>
                </CardContent>
            </ButtonBase>
        </>
    );
};

export default HomeButtons;
