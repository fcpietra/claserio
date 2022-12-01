function getStudentById(id){
    const options = {method: 'GET', headers: {'Content-Type': 'application/json'}, body: 'false'};

    return fetch('http://localhost:8000/api/v1/students/'+ id, options)
        .then(response => response.json())
        .then(response => response.data.firstName + ' ' + response.data.lastName + ' [' + response.data._id + ']')
        .catch(err => console.error(err));
}