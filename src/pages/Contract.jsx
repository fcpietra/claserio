import "../App.css";
import * as React from 'react';
import {useCookies} from "react-cookie";

export default function Contract() {
    const [cookies] = useCookies(['token']);

    function contract() {
        const classId = sessionStorage.getItem('classId');
        const message = document.getElementById('contractMessage').value;
        const timeRange = document.getElementById('timeRange').value;

        const body = {
            classId: classId,
            message: message,
            timeRange: timeRange
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': cookies.token},
            body: JSON.stringify(body)
        };

        fetch('http://localhost:8000/api/v1/reserve', options)
            .then(response => response.json())
            .then(response => {
                console.log(response.message);
                window.location.href = '/class/pending';
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="main-content-container">
            {
                <div className="contract-container">
                    <div className="contract-info">
                        <div className="contract-info-title">
                            <h1>Contract information</h1>
                        </div>
                        <hr/>
                        <div className="contract-info-content">
                            <div className="contract-info-content-item">
                                <h2>{sessionStorage.getItem("className")}</h2>
                                <h3>Contact times</h3>
                                <select name="time" id="timeRange">
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                </select>

                                <h2>Final Price: {sessionStorage.getItem("classPrice")}</h2>
                                <br/>
                                <input className="contract--message" type="text" id="contractMessage" placeholder="Message for the teacher"/><br/>
                                <a
                                    className="login--button"
                                    onClick={() => {
                                        contract();
                                        sessionStorage.removeItem("classId");
                                        sessionStorage.removeItem("className");
                                        sessionStorage.removeItem("classPrice");
                                    }
                                    }
                                >Contract</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
