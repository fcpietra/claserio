import React, {useEffect} from "react";
import "../App.css";
import {useCookies} from "react-cookie";
import Class from "../components/Class";
import {forEach} from "react-bootstrap/ElementChildren";
import HeaderMUI from "../components/HeaderMUI";
import Footer from "../components/Footer";

export default function PendingClasses(){
    const [classes, setClasses] = React.useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: cookies.token
            }
        };

        if ( sessionStorage.getItem("role") === "student" ){
            fetch('http://localhost:8000/api/v1//class/student/reserve', options)
                .then(response => response.json())
                .then(response => setClasses(response.data))
                .catch(err => console.error(err));

        } else if ( sessionStorage.getItem("role") === "teacher" ){
            fetch('http://localhost:8000/api/v1/class/teacher/state/unpublished', options)
                .then(response => response.json())
                .then(response => setClasses(response.data))
                .catch(err => console.error(err));
        } else {
            window.location.href = "/XD";
        }
    }, []);


    return (
        <>
            <HeaderMUI/>
            {
                (sessionStorage.getItem("role") === "student") ?
                    <div className="main-content-container">
                        <h1>Pending Classes</h1>
                        {classes.map((item) => (
                            <Class
                                rateable={false}
                                clickable={false}
                                commentable={false}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                duration={item.duration}
                                type={item.type}
                                image={item.image}
                                frequency={item.frequency}
                                subject={item.subject}
                                price={item.price}
                                rank={item.rank}
                                comments={item.comments}
                                teacherId={item.teacherId}
                            />
                        ))}
                    </div>
                    :
                    <div className="main-content-container">
                        <h1>Hidden Classes</h1>
                        {classes.map((item) => (
                            <Class
                                rateable={false}
                                clickable={false}
                                commentable={false}
                                editable={true}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                duration={item.duration}
                                type={item.type}
                                image={item.image}
                                frequency={item.frequency}
                                subject={item.subject}
                                price={item.price}
                                rank={item.rank}
                                comments={item.comments}
                                teacherId={item.teacherId}
                            />
                        ))}
                    </div>
            }

            <Footer/>
        </>

    );
}