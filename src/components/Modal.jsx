import * as React from 'react';
import Box from '@mui/material/Box';
import "../App.css";

import Modal from '@mui/material/Modal';

const style = {
    color: 'black',
    width: 400,
    height: 600,

    position: 'absolute',
    top: '15%',
    left: '35%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 10,
    borderRadius: 20,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1> More info about {props.nombre_clase} </h1>
                    <hr />
                    <h2>Materia</h2>
                    <p>{props.materia_clase}</p>
                    <h2>Frecuentia</h2>
                    <p>{props.frecuencia_clase}</p>
                    <h2>Costo</h2>
                    <p>{props.costo_clase}</p>
                </Box>
            </Modal>
        </div>
    );
}