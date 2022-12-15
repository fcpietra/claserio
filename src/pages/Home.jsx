import React, {useEffect} from "react";
import "../App.css";
import Class from "../components/Class";
import HeaderMUI from "../components/HeaderMUI";
import Footer from "../components/Footer";
import {useCookies} from "react-cookie";
import ClassRegister from "./ClassRegister";
import ClassFilter from "../components/ClassFilter";
import Button from "react-bootstrap/Button";

export default function Home() {
    const [classes, setClasses] = React.useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login";
        }

        let url = "http://localhost:8000/api/v1/class/student/not-reserve";

        if (sessionStorage.getItem("role") === "teacher") {
            return;
        }

        const options = {method: 'GET', headers: {'Content-Type': 'application/json',
            'Authorization': cookies.token}};

        fetch(url, options)
            .then(response => response.json())
            .then(response => setClasses(response.data))
            .catch(err => console.error(err));
        }, []);

    function getFilterValues() {
        let filterValues = {};
        if (sessionStorage.getItem("subjects") !== "null"){
            filterValues.subject = sessionStorage.getItem("subjects")
        }
        if (sessionStorage.getItem("frequency") !== "null"){
            filterValues.frequency = sessionStorage.getItem("frequency")
        }
        if (sessionStorage.getItem("type") !== "null"){
            filterValues.type = sessionStorage.getItem("type")
        }
        if (sessionStorage.getItem("stars") !== "null"){
            filterValues.rank = sessionStorage.getItem("stars")
        }
        return JSON.stringify(filterValues);
    }

    function filterClasses(filterValues) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: filterValues
        };

        fetch('http://localhost:8000/api/v1/class/student/filter', options)
            .then(response => response.json())
            .then(response => setClasses(response.data))
            .catch(err => console.error(err));
    }

    return (
        <>
            <HeaderMUI/>
            <div className="main-content-container">
                {sessionStorage.getItem("role") === "student" ? (
                    <div>
                        <h1>Home</h1>
                        <div>
                            <ClassFilter id={'subjects'} values={'math,science,history,english,spanish,art,music,technology,other'} name={'subjects'}/>
                            <ClassFilter id={'frequency'} values={'daily,weekly,monthly'} name={'frequency'}/>
                            <ClassFilter id={'type'} values={'individual,group'} name={'type'}/>
                            <ClassFilter id={'stars'} values={'1,2,3,4,5'} name={'stars'}/>
                            <Button variant="primary" onClick={() => {
                                filterClasses(getFilterValues());
                            }} >Filter</Button>
                        </div>

                        <br/>
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
                    ) : (
                        <div>
                            <h1>Create Class</h1>
                            <ClassRegister/>
                        </div>
                    )}
            </div>

            <Footer/>
        </>
    );
}