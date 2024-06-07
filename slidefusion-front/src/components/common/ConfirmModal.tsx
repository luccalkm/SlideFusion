
import { Button, Modal, Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 1,
    padding: 4,
};

type Props = {
    open: boolean;
    handleClose: () => void;
    title: string;
    text: string;
};

export default function ConfirmModal({ open, handleClose, title, text }: Props) {
    const navigate = useNavigate();

    const handleClearSessionStorage = () => {
        navigate('/');
        sessionStorage.clear();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} flexDirection={'column'}>
                    <Box width={'100%'}>
                        <Typography id="modal-modal-title" variant="h6">
                            {title}
                        </Typography>
                        <Divider color='secondary' />
                        <Typography id="modal-modal-description" sx={{ my: 2 }}>
                            {text}
                        </Typography>
                    </Box>
                    <Box display={'flex'} gap={1} justifyContent={'flex-end'} width={'100%'}>
                        <Button
                            sx={{ alignSelf: 'flex-end', marginTop: 2 }}
                            variant="outlined"
                            onClick={handleClearSessionStorage}
                            color="secondary"
                        >
                            CONFIRMAR
                        </Button>
                        <Button
                            sx={{ alignSelf: 'flex-end', marginTop: 2 }}
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            CANCELAR
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}