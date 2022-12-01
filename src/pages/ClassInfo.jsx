import React, {useEffect, useState} from "react";
import "../App.css";
import ClassFULL from '../components/ClassFULL'

export default function ClassInfo(){
    const [classInfo, setClassInfo] = useState([]);

    useEffect(() => {
        let id = sessionStorage.getItem("classId");

        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch('http://localhost:8000/api/v1/class/' + id, options)
            .then(response => response.json())
            .then(response => setClassInfo(response))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="main-content-container">
            {
                <ClassFULL isContratable={true}>
                    {/*id={classInfo._id}*/}
                    {/*name={classInfo.name}*/}
                    {/*description={classInfo.description}*/}
                    {/*duration={classInfo.duration}*/}
                    {/*type={classInfo.type}*/}
                    {/*image={classInfo.image}*/}
                    {/*frequency={classInfo.frequency}*/}
                    {/*subject={classInfo.subject}*/}
                    {/*price={classInfo.price}*/}
                    {/*rank={classInfo.rank}*/}
                    {/*teacherId={classInfo.teacherId}*/}
                </ClassFULL>
            }
        </div>
    );
}