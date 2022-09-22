import React from "react";
import '../App.css'

export default function Comment(props) {
return (
    <div className="comment--container">
      <strong><h3>{props.autor}</h3></strong>
      <p>{props.comentario}</p>
    </div>
  );

}