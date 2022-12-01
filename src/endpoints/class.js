const options = {method: 'GET', headers: {'Content-Type': 'application/json'}, body: 'false'};

fetch('http://localhost:8000/api/v1//class/6387996509c4b9c08f1333e6', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));