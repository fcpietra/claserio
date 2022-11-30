class Student {
    constructor(param) {
        this.firstName = param.firstName;
        this.lastName = param.lastName;
        this.phone = param.phone;
        this.email = param.email;
        this.password = param.password;
        this.education = param.education;
    }
}

function getStudentById(id){
    const options = {method: 'GET', headers: {'Content-Type': 'application/json'}, body: 'false'};

    return fetch('http://localhost:8000/api/v1/students/'+ id, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}