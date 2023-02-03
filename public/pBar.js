// Texto

var pTemp = document.getElementById("card-temp");
var pHum = document.getElementById("card-hum");
var pLi = document.getElementById("card-li");

var pBar = document.getElementById("statusBar-inner");

var dMap = document.getElementById("map");

const API_URL = 'https://coplant.onrender.com/data?lastFilter=true'
const API_URL_POSITION = 'https://coplant.onrender.com/position'


fetchData();
fetchPosition();

setInterval(() => {
    fetchData();
    fetchPosition();
}, 20000);




function fetchData() {
    
    fetch(API_URL,
        {
            mode: 'cors',
            method: 'GET'
        })
        // .then(rawData => console.log(rawData))
        .then(rawData=> rawData.json())
        .then(data=>  data.body)
        .then(data => {
            writeData(data.meanTemperature, data.meanHumidity, data.meanLuxP)
        })
        .catch(err =>{ 
            console.log(err.message)
            writeData(23, 87, 60)
        })

}
function fetchPosition() {
    
    fetch(API_URL_POSITION,
        {
            mode: 'cors',
            method: 'GET'
        })
        // .then(rawData => console.log(rawData))
        .then(rawData=> rawData.json())
        .then(data=>  data.body)
        .then(data => {
            console.log(dMap);

            const uluru = { lat: data.Lat, lng: data.Long };
            // The map, centered at Uluru
            const map = new google.maps.Map(dMap, {
                zoom: 16,
                center: uluru,
                mapTypeId: "hybrid"
            });
            // The marker, positioned at Uluru
            const marker = new google.maps.Marker({
                position: uluru,
                map: map,
            });
        })
        .catch(err =>{ 
            console.log(err.message)
            const uluru = { lat: 2.433, lng: -76.617 };
            // The map, centered at Uluru
            const map = new google.maps.Map(dMap, {
                zoom: 16,
                center: uluru,
                mapTypeId: "hybrid"
            });
            // The marker, positioned at Uluru
            const marker = new google.maps.Marker({
                position: uluru,
                map: map,
            });
        })

}

function writeData(temp, hum, lux) {
    pTemp.innerHTML = `${temp} °C`
    pHum.innerHTML = `${hum} %`
    pLi.innerHTML = `${lux.toFixed(2)} %`

    let width = hum;

    // ******* BARRA
    if (width >=96) {
        pBar.style.borderRadius = '13px';
    }
    pBar.style.width = width + "%";
}
