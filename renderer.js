const axios = require('axios');

document.getElementById('startButton').addEventListener('click', () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    axios.get('http://localhost:80http://localhost:8090/api/constellations?lat=${20.0063}&lon=${77.006}90/api/')
    .then(response => {
        document.getElementById('result').innerHTML = `
            <h2>Visible Constellations:</h2>
            <ul>
                ${response.data.constellations.map(c => `<li>${c.name}</li>`).join('')}
            </ul>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = '<p>Error retrieving data. Check console for details.</p>';
    });
});
