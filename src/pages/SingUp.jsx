import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useCookies} from 'react-cookie'
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";

class Student {
    constructor(param) {
        this.firstName = param.firstName;
        this.lastName = param.lastName;
        this.birthday = param.birthday;
        this.email = param.email;
        this.phone = param.phone;
        this.education = param.education;
        this.password = param.password;
    }
}

class Teacher {
    constructor(param) {
        this.firstName = param.firstName;
        this.lastName = param.lastName;
        this.birthday = param.birthday;
        this.email = param.email;
        this.phone = param.phone;
        this.title = param.title;
        this.experience = param.experience;
        this.password = param.password;
    }
}


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [cookies, setCookie] = useCookies(['token']);
    const [state, setState] = React.useState(false);

    React.useEffect(() => {
        sessionStorage.removeItem("role");
        sessionStorage.setItem("role", "teacher");
    }, []);

    function validate(response) {
        if (response.status === 201) {
            setCookie('token', response.data, {path: '/'});
            window.location.href = "/home";
        }
        else {
            alert("Error creating user");
        }
    }


    function createStudent(student){

        const newStudent = new Student ({
            firstName: student.firstName,
            lastName: student.lastName,
            birthday: student.birthday,
            email: student.email,
            phone: student.phone,
            education: student.education,
            password: student.password
        });

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(newStudent)
        };

        return fetch('http://localhost:8000/api/v1/students', options)
            .then(response => response.json())
            .then(response => validate(response))
            .catch(err => console.error(err));
    }

    function createTeacher(teacher){

        const newTeacher = new Teacher ({
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            birthday: teacher.birthday,
            email: teacher.email,
            phone: teacher.phone,
            title: teacher.title,
            experience: teacher.experience,
            password: teacher.password
        });

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(newTeacher)
        };

        return fetch('http://localhost:8000/api/v1/teachers', options)
            .then(response => response.json())
            .then(response => validate(response))
            .catch(err => console.error(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleStudentChange = (event) => {
        sessionStorage.setItem('role', 'student');
        setState(event.target.checked);
        document.getElementById("teacher").disabled = false;
        document.getElementById("student").disabled = true;
    }

    const handleTeacherChange = (event) => {
        sessionStorage.setItem('role', 'teacher');
        setState(!event.target.checked);
        document.getElementById("teacher").disabled = true;
        document.getElementById("student").disabled = false;
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
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
                                    <TextField
                                        required
                                        fullWidth
                                        type="date"
                                        id="birthday"
                                        label="Fecha de nacimiento"
                                        name="fechaNacimiento"
                                        autoComplete="name"
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="phone"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        autoFocus
                                    />
                                </Grid>
                                { sessionStorage.getItem("role") === "student" ?
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="education"
                                            label="Education"
                                            name="education"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    : <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="title"
                                            label="Title"
                                            name="title"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="experience"
                                    label="Experience"
                                    name="experience"
                                    autoComplete="family-name"
                                    />
                                    </Grid>
                                    </>
                                }

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                    sessionStorage.getItem("role") === "student" ?
                                        createStudent({
                                            firstName: document.getElementById("firstName").value,
                                            lastName: document.getElementById("lastName").value,
                                            birthday: document.getElementById("birthday").value,
                                            email: document.getElementById("email").value,
                                            phone: document.getElementById("phone").value,
                                            education: document.getElementById("education").value,
                                            password: document.getElementById("password").value
                                        })
                                        : createTeacher({
                                            firstName: document.getElementById("firstName").value,
                                            lastName: document.getElementById("lastName").value,
                                            birthday: document.getElementById("birthday").value,
                                            email: document.getElementById("email").value,
                                            phone: document.getElementById("phone").value,
                                            title: document.getElementById("title").value,
                                            experience: document.getElementById("experience").value,
                                            password: document.getElementById("password").value
                                        }
                                    )
                                }
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}