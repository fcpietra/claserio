import "../App.css";
import * as React from 'react';
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import HeaderMUI from "../components/HeaderMUI";


export default function RequestedClasses() {
    const [cookies] = useCookies(['token']);

    const [requests, setRequests] = React.useState([]);

    useEffect( () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: cookies.token,
            }
        };

        fetch('http://localhost:8000/api/v1/reserve/teacher/pending/', options)
            .then(response => response.json())
            .then(response => setRequests(response.data))
            .catch(err => console.error(err));
    }, []);

    function approveClassRequest(id) {
        const body = {
            state: 'accepted'
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

    function rejectClassRequest(id) {
        const body = {
            state: 'canceled'
        };
        const options = {
            method: 'PUT',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json'
            },
            body: body
        };

        fetch('http://localhost:8000/api/v1/reserve/' + id, options)
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

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
            body: body
        };

        fetch('http://localhost:8000/api/v1/reserve/' + id, options)
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

    return(
        <>
            <HeaderMUI/>
            {requests.map((r) => (
                <div className="request-comments--container">
                    <hr/>
                    <p>Student: {r.studentId}</p>
                    <p>Want's to contract: {r.classId}</p>
                    <p>Message: {r.message}</p>
                    <button onClick={
                        () => approveClassRequest(r._id)
                    }>Approve</button>
                    <button onClick={
                        () => rejectClassRequest(r._id)
                    }>Reject</button>
                    <br/>
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