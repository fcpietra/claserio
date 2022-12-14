import * as React from 'react';
import '../App.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useCookies} from "react-cookie";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme();

export default function SignIn() {
    const [cookies, setCookie] = useCookies(['token']);
    const [state, setState] = React.useState(false);
    const [passwordHide, setPasswordHide] = React.useState(true);

    function findStudentByEmail(email, password) {
        const options = {method: 'GET'};

        let identifier = "";
        const studentDocument = document.getElementById("student");


        if (studentDocument.checked) {
            identifier = "students";
        } else{
            identifier = "teachers";
        }

        return fetch('http://localhost:8000/api/v1/' + identifier + '/login/' + email + "/" + password, options)
            .then(response => response.json())
            .then(response => {
                if (response.status === 200) {
                    setCookie('token', response.data, {path: '/'});

                    if (identifier === "students") {
                        sessionStorage.setItem("role", "student");
                    } else {
                        sessionStorage.setItem("role", "teacher");
                    }

                    alert("Login successful");
                    window.location.href = "/home";
                }else{
                    console.log("Error: " + response.message);
                }
            })
            .catch(err => console.error(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        findStudentByEmail(data.get('email'), data.get('password')).then(r => console.log(r));
    };

    const handleStudentChange = (event) => {
        setState(event.target.checked);
    }

    const handleTeacherChange = (event) => {
        setState(!event.target.checked);
    }

    return (
        <ThemeProvider theme={theme}>

            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://researchleap.com/wp-content/uploads/2022/02/Our_Best_Education_Articles_of_2020.jpeg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch id="student" checked={state} onChange={handleStudentChange} />}
                                    label="Student"
                                />
                                <FormControlLabel
                                    control={<Switch id="teacher" checked={!state} onChange={handleTeacherChange} />}
                                    label="Teacher"
                                />
                            </FormGroup>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={passwordHide ? "password" : "text"}
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="show" color="primary" />}
                                label="Show password"
                                onChange={() => setPasswordHide(!passwordHide)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/recovery" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register/user" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}