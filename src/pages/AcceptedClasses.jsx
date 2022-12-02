import "../App.css";
import * as React from 'react';
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import HeaderMUI from "../components/HeaderMUI";


export default function AcceptedClasses() {
    const [cookies] = useCookies(['token']);

    const [requests, setRequests] = React.useState([]);

    useEffect( () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: cookies.token,
            }
        };

        fetch('http://localhost:8000/api/v1/reserve/teacher/accepted/', options)
            .then(response => response.json())
            .then(response => setRequests(response.data))
            .catch(err => console.error(err));
    }, []);

    function finishClassRequest(id) {
        const body = {
            state: 'finished'
        };
        const options = {
            method: 'PUT',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        fetch('http://localhost:8000/api/v1/reserve/' + id, options)
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

    return(
        <>
            <HeaderMUI/>
            <div className="main-content-container">
                <h1>Accepted Classes</h1>
            </div>
            {requests.map((r) => (
                <div className="request-comments--container">
                    <hr/>
                    <p>Student: {r.studentId}</p>
                    <p>Want's to contract: {r.classId}</p>
                    <p>Message: {r.message}</p>
                    <button onClick={
                        () => finishClassRequest(r._id)
                    }>Finish</button>
                    <hr/>
                    <br/>
                </div>
            ))}
        </>
    )
}