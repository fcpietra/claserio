import React from "react";
import "../App.css";
import Image from "./Image";
import { Link } from "react-router-dom";

export default function Landing(){

    return (
        <div className="main-content-container">
            <h1>Unite a la comunidad de aprendizaje online de la <strong>UADE</strong></h1>
            <p>Echale un ojo a nuestros cursos completamente a <strong>demanda</strong>!</p>
            
            <div className="info--container">
                <Image url="img/people-looking-phone.png" description = "Recordá que tenemos clases específicamente en grupo, así que no olvides compartirlas con tus amigos para poder trabajar juntos!" isVisible={true}></Image>
            
                <Image url="img/man-shows-gesture-great-idea_10045-637-removebg-preview.png" description = "Comentá y calificá clases para que nuestros docentes puedan mejorar en su trabajo y brindar mejores clases!"></Image>
            
                <Image url="img/young-female-illustration-character-with-no-hand-gesture_10045-690-removebg-preview.png" description = "NO OLVIDES ser respetuoso y tratar a tus pares de buena manera, sino, hay tabla"></Image>
            
                <Image url="img/young-woman-standing-front-mirror-motivate-confident-you-can-it-vector-illustration_10045-633-removebg-preview.png" description = "Y jamás olvides que tu única limitación es la dedicación que le pongas a cada cosa que hagas, asi que ánimo, podes hacerlo!"></Image>
            </div>
        </div>
    );
}