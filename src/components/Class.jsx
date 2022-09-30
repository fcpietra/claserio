import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button'
import "../App.css";
import Rating from "./Rating";
import Comment from "./Comment";
import Modal from "./Modal";
import ModalContratar from "./ModalContratar";

import {useState} from "react";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [moreInfo, setMoreInfo] = useState(false);
    const [contratar, setContratar] = useState(false);
    React.useEffect(() => {

    }, [moreInfo]);

    const handleMoreInfo = () => {
        if (moreInfo) {
            return <Modal
                nombre_clase = {props.nombre_clase}
                materia_clase = {props.materia_clase}
                frecuencia_clase = {props.frecuencia_clase}
                costo_clase = {props.costo_clase}
            />
        } else {

        }

    }

    const handleContratar = () => {
        if(contratar){
            return <ModalContratar 
                nombre_clase = {props.nombre_clase}
                costo_clase = {props.costo_clase}
                profesor = {props.profesor}
            />
        }
    }

    function getComments() {
        return props.comentarios_clase.map((comentario) => {
            return <Comment autor={comentario.alumno_id} comentario={comentario.comentario} />
        })
    }

    function contratarClaseButton() {
        if (props.estado_clase === "Activa") {
            return <Button  variant="contained"
                    onClick={() => {
                        setContratar(!contratar)
                    }}>
                Contratar clase
            </Button>
        }
    }

    return (
        <div className="class--container">

            <Card className="class--card">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <div onClick={() => setMoreInfo(!moreInfo)}>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                    }
                    title={props.nombre_clase}
                    subheader={props.fecha_clase}
                />
                <div className="class--more-info">
                    {handleMoreInfo()}
                </div>
                <div className="class--contratar">
                    {handleContratar()}
                </div>

                <CardMedia
                    component="img"

                    image={props.imagen_clase}
                    alt={props.nombre_clase + " image"}
                />

                <div className="corners--image">
                    <h5 className="left--image">{props.duracion_clase} min</h5>
                    <h5 className="right--image">{props.tipo_clase}</h5>
                </div>
                <div className="class--more-info">
                </div>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.descripcion_clase}
                    </Typography>
                    {contratarClaseButton()}

                </CardContent>
                <CardActions disableSpacing>

                    <Rating/>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <h2>Comentarios</h2>
                        {getComments()}
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
