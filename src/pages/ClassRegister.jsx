import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useCookies} from 'react-cookie'
import Select from 'react-select';

const typeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'group', label: 'Group' }
];

const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
];

const subjectOptions = [
    { value: 'math', label: 'Math' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'art', label: 'Art' },
    { value: 'music', label: 'Music' },
    { value: 'foreign language', label: 'Foreign Language' },
    { value: 'other', label: 'Other' }
];


class Class {
    constructor(param) {
        this.name = param.name;
        this.description = param.description;
        this.duration = param.duration;
        this.type = param.type;
        this.frequency = param.frequency;
        this.subject = param.subject;
        this.price = param.price;
        this.image = param.image;
    }
}

export default function RegisterClass() {
    const [cookies] = useCookies(['token']);

    const [type,setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    function createClass(paramClass){
        const newClass = new Class ({
            name: paramClass.name,
            description: paramClass.description,
            duration: paramClass.duration,
            type: paramClass.type,
            frequency: paramClass.frequency,
            subject: paramClass.subject,
            price: paramClass.price,
            image: paramClass.image
        });

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': cookies.token},
            body: JSON.stringify(newClass)
        };

        return fetch('http://localhost:8000/api/v1/class', options)
            .then(response => response.json())
            .then(response => {
                alert('Class created successfully');
                window.location.href = '/class/approved';
            })
            .catch(err => console.error(err));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            teacherId: data.get('teacherId'),
        });
    };

    return (
        <>
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
                        Class Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="duration"
                                    label="Duration"
                                    type="time"
                                    defaultValue="00:00"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <>
                                    <Select
                                        id="type"
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={typeOptions[0]}
                                        name="type"
                                        options={typeOptions}
                                    />

                                    <div
                                        style={{
                                            color: 'hsl(0, 0%, 40%)',
                                            display: 'inline-block',
                                            fontSize: 12,
                                            fontStyle: 'italic',
                                            marginTop: '1em',
                                        }}
                                    >
                                    </div>
                                </>
                            </Grid>
                            <Grid item xs={6}>
                                <>
                                    <Select
                                        id={"frequency"}
                                        defaultValue={frequencyOptions[0]}
                                        name="frequency"
                                        options={frequencyOptions}
                                    />

                                    <div
                                        style={{
                                            color: 'hsl(0, 0%, 40%)',
                                            display: 'inline-block',
                                            fontSize: 12,
                                            fontStyle: 'italic',
                                            marginTop: '1em',
                                        }}
                                    >
                                    </div>
                                </>
                            </Grid>
                            <Grid item xs={6}>
                                <>
                                    <Select
                                        id={"subject"}
                                        defaultValue={subjectOptions[0]}
                                        name="subject"
                                        options={subjectOptions}
                                    />

                                    <div
                                        style={{
                                            color: 'hsl(0, 0%, 40%)',
                                            display: 'inline-block',
                                            fontSize: 12,
                                            fontStyle: 'italic',
                                            marginTop: '1em',
                                        }}
                                    >
                                    </div>
                                </>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <input id="price" name="price" type="number" min="0" max="1500"  placeholder="Price" />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="image"
                                    required
                                    fullWidth
                                    id="image"
                                    label="Image"
                                />
                            </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => createClass({
                                name: document.getElementById('name').value,
                                description: document.getElementById('description').value,
                                duration: document.getElementById('duration').value,
                                type: document.getElementById("type").innerText.toLowerCase(),
                                frequency: document.getElementById('frequency').innerText.toLowerCase(),
                                subject: document.getElementById('subject').innerText.toLowerCase(),
                                price: document.getElementById('price').value,
                                image: document.getElementById('image').value
                            })}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Class
                        </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}