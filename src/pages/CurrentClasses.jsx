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
    const [commentable, setCommentable] = React.useState(false);

    useEffect(() => {
            if (sessionStorage.getItem("role") === "student") {
                setCommentable(true);
            }
        }
        , []);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: cookies.token
            }
        };

        if (sessionStorage.getItem("role") === "student") {
            fetch('http://localhost:8000/api/v1/class/student/reserve/approved', options)
                .then(response => response.json())
                .then(response => setClasses(response.data))
                .catch(err => console.error(err));
            }
        else if (sessionStorage.getItem("role") === "teacher") {
            fetch('http://localhost:8000/api/v1/class/teacher/state/published', options)
                .then(response => response.json())
                .then(response => setClasses(response.data))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <>
            <HeaderMUI/>
            {sessionStorage.getItem("role") === "student" ?
                <div className="main-content-container">
                    <h1>Current Classes</h1>
                    {classes.map((item) => (
                        <Class
                            rateable={false}
                            clickable={false}
                            commentable={commentable}
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
                </div>:
                <div className="main-content-container">
                    <h1>Current Classes</h1>
                    {classes.map((item) => (
                        <Class
                            rateable={false}
                            clickable={false}
                            editable={true}
                            commentable={commentable}
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