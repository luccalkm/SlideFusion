import { AccountBox, ImageSearch, PostAdd } from '@mui/icons-material';
import { RouteItem } from "../types/RouteItem";

export const routeItems: RouteItem[] = [
    {
        displayName: "Galeria",
        icon: <ImageSearch />,
        link: "/gallery"
    },
    {
        displayName: "Criar apresentação",
        icon: <PostAdd />,
        link: "/create-presentation"
    },
    {
        displayName: "Perfil",
        icon: <AccountBox />,
        link: "/profile"
    }
];
