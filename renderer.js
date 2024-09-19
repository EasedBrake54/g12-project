const axios = require('axios');
const axios = require('axios');

document.getElementById('startBtn').onclick = function () {
    const lat = '22.0063';  // Fixed latitude for Palampur, India
    const lon = '77.006';   // Fixed longitude for Palampur, India

    // Set location and fetch constellations
    setLocationAndFetchConstellations(lat, lon);
};

// Function to set location and fetch visible constellations
async function setLocationAndFetchConstellations(lat, lon) {
    try {
        // Step 1: Set the location in Stellarium
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            altitude: '0',
            timezone: 'Asia/Kolkata'
        });

        console.log("Sending location data:", params.toString());  // Debugging output

        const locationResponse = await axios.post(
            'http://localhost:8090/api/location/setlocation',
            params.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        if (locationResponse.status === 200) {
            console.log('Location set successfully.');

            // Step 2: Fetch information about constellations
            const constellations = ['Orion', 'Ursa Major', 'Cassiopeia']; // Add more constellations here
            fetchConstellationInfo(constellations);
        } else {
            document.getElementById('output').innerHTML = 'Failed to set location.';
        }

    } catch (error) {
        console.error('Error setting location:', error.message);
        document.getElementById('output').innerHTML = `Error setting location: ${error.message}`;
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

// Function to fetch constellation information and update the UI
async function fetchConstellationInfo(constellationNames) {
    const output = document.getElementById('output');
    output.innerHTML = '';  // Clear previous output

    try {
        for (const name of constellationNames) {
            const response = await axios.get(`http://localhost:8090/api/objects/info?name=${name}&format=json`);

            const data = response.data;

            if (data['above-horizon']) {
                const div = document.createElement('div');
                div.innerHTML = `<h2>${data.name} is visible!</h2>`;
                output.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.innerHTML = `<h2>${data.name} is below the horizon.</h2>`;
                output.appendChild(div);
            }
        }
    } catch (error) {
        console.error('Error fetching constellation info:', error.message);
        document.getElementById('output').innerHTML = `Error fetching constellations: ${error.message}`;
    }
}

