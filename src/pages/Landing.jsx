import React, {useEffect, useState} from "react";
import "../App.css";
import Image from "../components/Image";
import Footer from "../components/Footer";
import {useCookies} from "react-cookie";

export default function Landing() {
    const [cookies] = useCookies(['token']);

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: cookies.token
            }
        };

        fetch('http://localhost:8000/api/v1/students', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setLogged(response);

            })
            .catch(err => console.error(err));

    }, []);

    return (
        <>

            {/* acá haría un auto login, pero tan solo si react tuviese sentido XD */}
            <div className="main-content-container">
                <h1>Unite a la comunidad de aprendizaje online de la <strong>UADE</strong></h1>
                <p>Echale un ojo a nuestros cursos completamente a <strong>demanda</strong>!</p>

                <div className="login--register">
                    <a href="/login">Login</a>
                    <a href="/register/user">Register</a>
                </div>


                <div className="info--container">
                    <Image url="img/people-looking-phone.png" description = "Recordá que tenemos clases específicamente en grupo, así que no olvides compartirlas con tus amigos para poder trabajar juntos!" isVisible={true}></Image>

                    <Image url="img/man-shows-gesture-great-idea_10045-637-removebg-preview.png" description = "Comentá y calificá clases para que nuestros docentes puedan mejorar en su trabajo y brindar mejores clases!"></Image>

                    <Image url="img/young-female-illustration-character-with-no-hand-gesture_10045-690-removebg-preview.png" description = "NO OLVIDES ser respetuoso y tratar a tus pares de buena manera, sino, hay tabla"></Image>

                    <Image url="img/young-woman-standing-front-mirror-motivate-confident-you-can-it-vector-illustration_10045-633-removebg-preview.png" description = "Y jamás olvides que tu única limitación es la dedicación que le pongas a cada cosa que hagas, asi que ánimo, podes hacerlo!"></Image>
                </div>
            </div>
            <Footer/>
        </>
    );
}