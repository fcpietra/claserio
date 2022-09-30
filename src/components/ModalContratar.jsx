import * as React from 'react';
import Box from '@mui/material/Box';
import "../App.css";
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button";

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
                    <FormGroup>
                        <h1> Contratar clase: {props.nombre_clase} </h1>
                        <h2>Pagarás ${props.costo_clase}</h2>
                        <h2>Horario de referencia para el contacto</h2>
                        <Grid>
                            <FormControlLabel control={<Checkbox />} label="9 a 13" /> 
                            <FormControlLabel control={<Checkbox />} label="14 a 17" /> 
                            <FormControlLabel control={<Checkbox />} label="18 a 21" /> 
                        </Grid>
                        <TextField
                            id="mensaje-profesor"
                            label="Escribí un mensaje al profesor"
                            multiline
                            rows={4}
                            variant="standard"
                        />
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Contratar
                        </Button>
                    </FormGroup>
                </Box>
            </Modal>
        </div>
    );
}