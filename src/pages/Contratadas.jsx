import React from "react";
import "../App.css";
import Image from "../components/Image";
import Class from "../components/Class";

export default function Contratadas(){
    const clases = [
        {
            nombre_clase: 'Uso de React JS',
            descripcion_clase: 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.',
            duracion_clase: 120,
            tipo_clase: 'Individual',
            fecha_clase: '2021-10-10',
            imagen_clase: 'https://i.ytimg.com/vi/bMknfKXIFA8/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDBVeerATqr0MyevfZHikBStPoWOQ',
            frecuencia_clase: 'Semanal',
            materia_clase: 'Aplicaciones Interactivas',
            costo_clase: 1000,
            profesor_clase: {
                nombre_profesor: 'Juan Carlos',
                apellido_profesor: 'Gonzalez',
                correo_profesor: 'jgonzales@uade.edu.ar',
                telefono_profesor: '011-12345678'
            },
            calificacion_clase: [
                {
                    calificacion: 5,
                    alumno_id: 1
                },
                {
                    calificacion: 4,
                    alumno_id: 2
                },
                {
                    calificacion: 3,
                    alumno_id: 3
                }
            ],
            comentarios_clase: [
                {
                    comentario: 'Muy buena clase',
                    alumno_id: 1
                },
                {
                    comentario: 'BUENARDA',
                    alumno_id: 2
                }
            ],
            estado_clase: 'Contratada'
        }
    ]

    const createClasses = () => {
        return clases.map((clase) => {
            return <Class
                nombre_clase={clase.nombre_clase}
                descripcion_clase={clase.descripcion_clase}
                duracion_clase={clase.duracion_clase}
                tipo_clase={clase.tipo_clase}
                fecha_clase={clase.fecha_clase}
                imagen_clase={clase.imagen_clase}
                frecuencia_clase={clase.frecuencia_clase}
                materia_clase={clase.materia_clase}
                costo_clase={clase.costo_clase}
                profesor_clase={clase.profesor_clase}
                calificacion_clase={clase.calificacion_clase}
                comentarios_clase={clase.comentarios_clase}
                estado_clase={clase.estado_clase}
            />
        })
    }

    return (
        <div className="main-content-container">
            <h1>Tus Clases</h1>
            {createClasses()}
        </div>
    );
}