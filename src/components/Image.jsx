import React from "react";
import "../App.css";

export default function Image(props){

    return (
        <div className="image-info-container">
            <p>{props.description}</p>
            <img src={props.url} alt="Online Learning"></img>
        </div>
    );
}