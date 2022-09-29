import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import "../App.css";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from "../components/SelectEstudios";

const theme = createTheme();

export default function RegisterForm(props) {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  function generateInput() {
    if (alignment === 'estudiante') {
        return (
            <>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    type="date"
                    id="fechaNacimiento"
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    autoComplete="name"
                    InputLabelProps={{shrink: true}}
                />
            </Grid>
                <Select  />
            </>

        );
    }
    else if (alignment === 'docente') {
        return (
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="name"
            />
            </Grid>
        );
    }
    return undefined;
  }

function setup() {
    if (props.registrar === "clase") {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar  id="top-register" sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro Clase
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid className="box-container" container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="nombre_clase"
                                        required
                                        fullWidth
                                        id="nombre_clase"
                                        label="Nombre Clase"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="materia_clase"
                                        label="Materia"
                                        name="materia_clase"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="duracion_clase"
                                        label="Duración"
                                        name="duracion_clase"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="frecuencia_clase"
                                        label="Frecuencia"
                                        name="frencuencia_clase"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="costo_clase"
                                        label="Costo"
                                        id="costo_clase"
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Crear clase
                            </Button>

                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        )
    } else if (props.registrar === "usuario") {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar  id="top-register" sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro Usuario
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid className="box-container" container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="nombre"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="apellido"
                                        label="Apellido"
                                        name="apellido"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="telefono"
                                        label="Teléfono"
                                        name="telefono"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ToggleButtonGroup
                                        variant="text"
                                        color="primary"
                                        value={alignment}
                                        exclusive
                                        fullWidth
                                        onChange={handleChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="estudiante">Estudiante</ToggleButton>
                                        <ToggleButton value="docente">Docente</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                                {generateInput()}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarse
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" >
                                        ¿Ya tenés tu cuenta? Ingresá
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        )
    }
}

return (
    <div>
        {setup()}
    </div>
    );
}
