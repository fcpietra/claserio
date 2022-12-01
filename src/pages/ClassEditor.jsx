import React, {useEffect, useState} from "react";
import "../App.css";
import ClassFULL from '../components/ClassFULL'
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import Button from "@mui/material/Button";
import {useCookies} from "react-cookie";


const typeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'group', label: 'Group' }
];

const visibleOptions = [
    { value: true, label: 'Visible' },
    { value: false, label: 'Hidden' }
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
        this.image = param.image;
        this.frequency = param.frequency;
        this.subject = param.subject;
        this.price = param.price;
        this.state = param.state;
    }
}

export default function ClassInfo(){
    const [classInfo, setClassInfo] = useState([]);

    useEffect(() => {
        let id = sessionStorage.getItem("classId");

        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch('http://localhost:8000/api/v1/class/' + id, options)
            .then(response => response.json())
            .then(response => setClassInfo(response.data))
            .catch(err => console.error(err));
    }, []);

    const [cookies] = useCookies(['token']);

    function updateClass(paramClass) {
        const newClass = new Class({
            name: paramClass.name,
            description: paramClass.description,
            duration: paramClass.duration,
            type: paramClass.type,
            image: paramClass.image,
            frequency: paramClass.frequency,
            subject: paramClass.subject,
            price: paramClass.price,
            state: paramClass.state
        });

        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': cookies.token},
            body: JSON.stringify(newClass)
        };

        return fetch('http://localhost:8000/api/v1/class/' + sessionStorage.getItem("classId"), options)
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

                    <Typography component="h1" variant="h5">
                        Class Editor
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    value={classInfo.name}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    value={classInfo.description}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="duration"
                                    type="time"
                                    defaultValue={classInfo.duration}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <>
                                    <Select
                                        id="type"
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={classInfo.type}
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
                                        defaultValue={classInfo.frequency}
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
                                        defaultValue={classInfo.subject}
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
                                <input id="price" name="price" type="number" min="0" max="1500"  placeholder="Price" value={classInfo.price}/>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="image"
                                    required
                                    fullWidth
                                    id="image"
                                    defaultValue={classInfo.image}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <>
                                    <Select
                                        id={"state"}
                                        defaultValue={classInfo.state}
                                        name="state"
                                        options={visibleOptions}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={() => updateClass({
                                    name: document.getElementById('name').value,
                                    description: document.getElementById('description').value,
                                    duration: document.getElementById('duration').value,
                                    type: document.getElementById("type").innerText.toLowerCase(),
                                    image: document.getElementById('image').value,
                                    frequency: document.getElementById('frequency').innerText.toLowerCase(),
                                    subject: document.getElementById('subject').innerText.toLowerCase(),
                                    price: document.getElementById('price').value,
                                    state: document.getElementById('state').value
                                })}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Edit Class
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}