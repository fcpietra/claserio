import React from "react";
import "../styles/Register.css";

export default function RolSelector(){
    const [alignment, setAlignment] = React.useState('');

    const changeUrl = (alignment) => {
        if(alignment === "alumno"){
            return "https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=826&t=st=1662260570~exp=1662261170~hmac=d1adadd99f26f1e8b7b8f7de48300b6643719268b677bf5f29edaa8088feaa96";
        }else if(alignment === "profesor"){
            return "https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg?w=826&t=st=1662260535~exp=1662261135~hmac=93f2c1d03c10cf16ff45d52799ea6fc0a92fcfffb3293ed5c8e1f0cbc3a5a444";
        }else{
            return "https://img.freepik.com/free-vector/6-confuse1_10045-702.jpg?w=826&t=st=1662261943~exp=1662262543~hmac=7fde781779683185dbb107b5bf257358e46006dfda71a5174db06adebe23f594";
        }
    }

    const changeDisplay = (alignment) => {
        if(alignment !== ""){
            return "none";
        }else{
            return "inline-block";
        }
    }

  return (
    <div className="rol-selector-container">
        <h2>{alignment !== "alumno" && alignment !== "profesor" ? "¿Qué soy?" : "¡Soy " + alignment + "!"}</h2>
        <img src={changeUrl(alignment)}></img><br></br>

        <button style={{display: changeDisplay(alignment)}} onClick={() => setAlignment("alumno")}>Alumno</button>
        
        <button style={{display: changeDisplay(alignment)}} onClick={() => setAlignment("profesor")}>Profesor</button>

        {alignment !== "" ? ((<button onClick={() => alert("Sexo")}>Confirmar</button>)) : null}
    </div>
  );
}