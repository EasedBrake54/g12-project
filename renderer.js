const axios = require('axios');

document.getElementById('startBtn').onclick = function() {
    const lat = '22.0063';  // Fixed latitude for Palampur, India
    const lon = '77.006';   // Fixed longitude for Palampur, India

    // Make a request to the Stellarium API
    fetchConstellations(lat, lon);
};

// Function to fetch constellations and update the UI
async function fetchConstellations(lat, lon) {
    try {
        const response = await axios.get(`http://localhost:8090/api/constellations?lat=${lat}&lon=${lon}`);
        const constellations = response.data.constellations;

        if (constellations && constellations.length > 0) {
            const output = document.getElementById('output');
            output.innerHTML = '';  // Clear previous output
            constellations.forEach(constellation => {
                const div = document.createElement('div');
                div.innerHTML = `<h2>${constellation.name}</h2>`;
                output.appendChild(div);
            });
        } else {
            document.getElementById('output').innerHTML = 'No constellations visible at the moment.';
        }
    } catch (error) {
        console.error('Error fetching constellations:', error.message);
        document.getElementById('output').innerHTML = `Error fetching constellations: ${error.message}`;
    }
}
