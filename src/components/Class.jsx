import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import "../App.css";
import Rating from "./Rating";
import {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import {useCookies} from "react-cookie";


export default function Class(props) {
    const [teacherInitial, setTeacherInitial] = React.useState('');
    const [selectedImage, setSelectedImage] = React.useState(false);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        console.log("Loading image");
        let img = new Image();
        img.onload = () => {
            console.log("Image loaded");
            setSelectedImage(true);
        }
        img.onerror = () => {
            console.log("Image not loaded");
            setSelectedImage(false)
        }
        img.src = props.image;
    }, [props.image]);


    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};

        fetch('http://localhost:8000/api/v1/teachers/' + props.teacherId, options)
            .then(response => response.json())
            .then(response =>  setTeacherInitial(response.data.lastName.charAt(0)))
            .catch(err => console.error(err));
    }, []);

    function selectClass() {
        console.log("Class id: " + JSON.stringify(props))

        sessionStorage.setItem('classId', props.id);
        window.location.href = '/class';
    }

    const commentClass = () => {
        let comment = document.getElementById(props.id + "-comment").value;
        let rating = parseInt(document.getElementById(props.id + "-rate").value);


        const body = JSON.stringify({
            "classId": props.id,
            "comment": comment,
            "rank": rating
        });

        const options = {
            method: 'POST',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json'
            },
            body: body
        };

        if (comment === "" || rating === "") {
            alert("Fill all fields");
            window.location.reload();
        }

        fetch('http://localhost:8000/api/v1/comment', options)
            .then(response => response.json())
            .then(response => {
                alert("Comment Sent");
                window.location.href = '/home';
            })
            .catch(err => console.error(err));

    }

    function editClass() {
        sessionStorage.setItem('classId', props.id);
        window.location.href = '/class/edit';
    }

    return (
        <div className="class--container">
            {props.clickable ? (
                <a className="class--container--clickable" onClick={selectClass}>
                    <Card className="class--card">
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {teacherInitial}
                                </Avatar>
                            }

                            title={props.name}
                            subheader={props.date}
                        />

                        <CardMedia
                            component="img"
                            image={
                                (selectedImage ? props.image : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")
                            }
                            alt={props.name + " image"}
                        />

                        <div className="corners--image">
                            <h5 className="left--image">{props.duration} hs</h5>
                            <h5 className="right--image">{props.type}</h5>
                        </div>
                        <div className="class--more-info">
                        </div>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {props.description}
                            </Typography>
                        </CardContent>
                        {props.rateable ? (
                            <Rating/>
                        ) : undefined}
                    </Card>
                </a>
            ) : (
                <Card className="class--card">
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {teacherInitial}
                            </Avatar>
                        }
                        title={props.name}
                        subheader={props.date}
                    />
                    <CardMedia
                        component="img"
                        image={
                            (selectedImage ? props.image : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")
                        }
                        alt={props.name + " image"}
                    />

                    <div className="corners--image">
                        <h5 className="left--image">{props.duration} hs</h5>
                        <h5 className="right--image">{props.type}</h5>
                    </div>
                    <div className="class--more-info">
                    </div>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.description}
                        </Typography>
                    </CardContent>
                    {
                        props.rateable ? (
                            <Rating/>
                        ) : undefined
                    }
                    {props.editable ? (
                        <div className="class--buttons">
                            <Button className="login--button" variant="primary" onClick={editClass}>Edit class</Button>
                        </div>
                    ) : undefined}

                    <br/><br/>
                    {props.commentable ? (
                        <div>
                            <div>
                                <label htmlFor="comment-text">Rate: </label>
                                <input type="number" id={props.id + "-rate"} min="1" max="5"/>
                                <br/><br/>
                                <input id={props.id + "-comment"} type="text" placeholder="Comment"/>
                            </div>
                            <br/><br/>
                            <div className="comment--rating">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={commentClass}
                                    className="comment--btn"
                                >
                                    Leave Comment
                                </Button>
                            </div>
                        </div>
                    ) : undefined}
                </Card>
            )}
        </div>
    );
}

