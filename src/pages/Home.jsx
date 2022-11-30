import React from "react";
import "../App.css";
import Class from "../components/Class";
import HeaderMUI from "../components/HeaderMUI";
import Footer from "../components/Footer";
import {useCookies} from "react-cookie";

export default function Home() {
    const [classes, setClasses] = React.useState([]);
    const [cookies] = useCookies(['token']);

    React.useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login";
        }

        let url = "http://localhost:8000/api/v1/class/student/state/published";

        if (sessionStorage.getItem("role") === "teacher") {
            url += "teacher";
        }

        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};

        fetch(url, options)
            .then(response => response.json())
            .then(response => setClasses(response.data))
            .catch(err => console.error(err));
        }, []);

    return (
        <>
            <HeaderMUI/>
            <div className="main-content-container">
                <h1>Home</h1>
                <div>
                    {classes.map((item) => (
                        <Class
                            rateable={false}
                            clickable={true}
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
            </div>
            <Footer/>
        </>
    );
}