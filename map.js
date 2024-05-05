var map = L.map('map').setView([12.975955, 77.587681], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([12.975955, 77.587681]).addTo(map);

require('dotenv').config();

// linking geoipify api

function fetchIPInfo() {
    var ipAddress = document.getElementById('search-bar').value;
    const apiKey = process.env.API_KEY;
    var apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`

    // Making a request to the API
    fetch(apiUrl)
        
        .then(response => response.json())
        .then(data => {
            // Updating HTML elements with the retrieved information
            console.log(data);
            document.querySelector('.info .sec:nth-child(1) .val').textContent = data.ip || 'Not Available';
            document.querySelector('.info .sec:nth-child(2) .val').textContent = data.location.city || 'Not Available';
            document.querySelector('.info .sec:nth-child(2) .val2').textContent = data.location.country || 'Not Available';
            document.querySelector('.info .sec:nth-child(3) .val').textContent = data.location.timezone || 'Not Available';
            document.querySelector('.info .sec:nth-child(4) .val').textContent = data.isp || 'Not Available';

            var lat = data.location.lat;
            var lng = data.location.lng;
            updateMap(lat, lng);
        })
        .catch(error => {
            console.error('Error fetching IP information:', error);
        });
}

function updateMap(lat, lng){
    if(marker){
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng],12);
}

//popup when clicked on map indicating latitude and longitude
var popup = L.popup();
function onMapClick(e){
    popup
         .setLatLng(e.latlng)
         .setContent("You clicked the map at " + e.latlng.toString())
         .openOn(map);
}
map.on('click', onMapClick);

