import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default function SelectEstudios() {
    const [state, setState] = React.useState('');
    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    const [type, setType] = React.useState('');
    const handleChangeType = (event) => {
        setType(event.target.value);
    }
    return (
        <div>
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-textbox">Institucion</InputLabel>
                <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel id="demo-customized-select-label">Estado</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={state}
                    onChange={handleChangeState}
                    input={<BootstrapInput />}
                >

                    <MenuItem value={"incompleto"}>Incompleto</MenuItem>
                    <MenuItem value={"proceso"}>En progreso</MenuItem>
                    <MenuItem value={"completo"}>Completo</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Tipo</InputLabel>
                <NativeSelect
                    id="demo-customized-select-native"
                    value={type}
                    onChange={handleChangeType}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="" />
                    <option value={"primario"}>Primario</option>
                    <option value={"secundario"}>Secundario</option>
                    <option value={"universitario"}>Universitario</option>
                </NativeSelect>
            </FormControl>
        </div>
    );
}
