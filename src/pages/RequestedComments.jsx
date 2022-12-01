import "../App.css";
import * as React from 'react';
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import HeaderMUI from "../components/HeaderMUI";

export default function RequestedComments() {
    const [cookies] = useCookies(['token']);

    const [comments, setComments] = React.useState([]);

    useEffect( () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: cookies.token,
            }
        };

        fetch('http://localhost:8000/api/v1/comment/pending/teacher', options)
            .then(response => response.json())
            .then(response => setComments(response.data))
            .catch(err => console.error(err));
    }, []);

    function approveComment(id) {
        const body = {
            state: 'approved'
        };
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.token},
            body: JSON.stringify(body)
        };

        fetch('http://localhost:8000/api/v1/comment/' + id, options)
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

    function rejectComment(id) {
        const body = {
            state: 'blocked'
        };
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.token},
            body: JSON.stringify(body)
        };

        fetch('http://localhost:8000/api/v1/comment/' + id, options)
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

    return(
        <>
            <HeaderMUI/>
            {comments.map((c) => (
                <div className="request-comments--container">
                    <hr/>
                    <p>{c.comment}</p>
                    <button onClick={
                        () => approveComment(c._id)
                    }>Approve</button>
                    <button onClick={
                        () => rejectComment(c._id)
                    }>Reject</button>
                    <hr/>
                    <br/>
                </div>
            ))}
        </>
    )
}