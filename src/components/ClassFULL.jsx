import "../App.css";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import HeaderMUI from "./HeaderMUI";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ClassFULL(props) {
    const [selectedClass, setSelectedClass] = useState([])
    const [classTeacher, setClassTeacher] = useState('')
    const [classComments, setClassComments] = useState([])

    useEffect(() => {
        const id = sessionStorage.getItem("classId");
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};

        fetch('http://localhost:8000/api/v1/class/' + id, options)
            .then(response => response.json())
            .then(response => {
                setSelectedClass(response.data)
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const options = {method: 'GET'};
        const classId = sessionStorage.getItem("classId");

        fetch('http://localhost:8000/api/v1/comment/approved/classId/' + classId, options)
            .then(response => response.json())
            .then(response => setClassComments(response.data))
            .catch(err => console.error(err));

    }, []);


    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};

        fetch('http://localhost:8000/api/v1/teachers/' + selectedClass.teacherId, options)
            .then(response => response.json())
            .then(response => setClassTeacher(response.data.lastName + " " + response.data.firstName))
            .catch(err => console.error(err));
    }, []);

    function getVisibility() {
        if (selectedClass.state) {
            return <VisibilityIcon/>
        }
        return <VisibilityOffIcon/>
    }

    return(
        <>
            <HeaderMUI/>
            <div className="class--container">
                <Card variant="outlined" sx={{ width: 320 }}>
                    <a >
                        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                        By: {classTeacher}
                        </Typography>
                    </a>
                    <Typography level="body2">{selectedClass.name}</Typography>
                    <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                    >
                        {props.isContratable ? null: getVisibility()}
                    </IconButton>
                    <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                        <img
                            src={selectedClass.image}
                            srcSet={selectedClass.image}
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <div className="class--aditional--info">
                        <p>Description: {selectedClass.description}</p>
                        <p>Duration: {selectedClass.duration}</p>
                        <p>Type: {selectedClass.type}</p>
                        <p>Frequency: {selectedClass.frequency}</p>
                    </div>
                    <Box sx={{ display: 'flex' }}>
                        <div>
                            <Typography level="body3">Total price:</Typography>
                            <Typography fontSize="lg" fontWeight="lg">
                                $ {selectedClass.price}
                            </Typography>
                        </div>
                        <Button
                            variant="solid"
                            size="sm"
                            color="primary"
                            aria-label="Explore Bahamas Islands"
                            sx={{ ml: 'auto', fontWeight: 600 }}
                        >
                            Subject: {selectedClass.subject}
                        </Button>
                    </Box>
                    <p>Rating: {selectedClass.rank}</p>
                    {props.isContratable === true ?
                        <div>
                            <Button
                                onClick={() => {
                                    sessionStorage.setItem("classId", selectedClass._id);
                                    sessionStorage.setItem("classPrice", selectedClass.price);
                                    sessionStorage.setItem("classTeacherId", selectedClass.teacherId);
                                    sessionStorage.setItem("className", selectedClass.name);
                                    window.location.href = "/contract";
                                    }
                                }
                                variant="solid"
                                size="sm"
                                color="primary"
                                aria-label="Explore Bahamas Islands"
                                style={{backgroundColor: "#3f51b5", color: "white"}}
                                sx={{ ml: 'auto', fontWeight: 600 }}
                            >
                                Contract
                            </Button>

                            <br/>
                            <h2>Comments</h2>
                            {classComments.map((c) => (
                                <div>
                                    <hr/>
                                    <p>{c.comment}</p>
                                    <p>Rating: {c.rank}</p>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                    : null}
            </Card>
        </div>
        <Footer/>
        </>
    )
}
