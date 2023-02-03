// ******Texto

//data
var pTemp = document.getElementById("d-temp");
var pHum = document.getElementById("d-hum");
var pLi = document.getElementById("d-li");

//btntext
var pWind = document.getElementById("btn-window-p");
var pAIrr = document.getElementById("btn-aIrr-p");

//botones
var btnWind = document.getElementById("btn-window");
var btnFull = document.getElementById("btn-full");

var btnIrr = document.getElementById("btn-irr");
var btnAIrr = document.getElementById("btn-aIrr");

var dMap = document.getElementById("map");

const API_URL_DATA = 'https://coplant.onrender.com/data?lastFilter=true'
const API_URL_VENTANA = 'https://coplant.onrender.com/VENTANA'
const API_URL_RIEGO = 'https://coplant.onrender.com/RIEGO'
const API_URL_RIEGOAUTO = 'https://coplant.onrender.com/RIEGOAUTO'
const API_URL_POSITION = 'https://coplant.onrender.com/position'

//** Interaccion */
//apenas carga
fetchData();
fetchVentana();
fetchRiegoauto();
fetchPosition();

//recarga temporal
setInterval(() => {
    fetchData();
    fetchVentana();
    fetchRiegoauto();
    fetchPosition();
}, 20000);

//botones
btnWind.addEventListener('click', eventWind)
//btnFull.addEventListener('click', eventFull)

btnIrr.addEventListener('click', eventIrr)
btnAIrr.addEventListener('click', eventAIrr)
//***** fETCH GET */
function fetchData() {
    
    fetch(API_URL_DATA,
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
function fetchVentana() {
    
    fetch(API_URL_VENTANA,
        {
            mode: 'cors',
            method: 'GET'
        })
        // .then(rawData => console.log(rawData))
        .then(rawData=> rawData.json())
        .then(data=>  data.body)
        .then(data => {
            writeVentana(data, true)
        })
        .catch(err =>{ 
            console.log(err.message)
            writeVentana(data, false)
        })

}
function fetchRiegoauto() {
    
    fetch(API_URL_RIEGOAUTO,
        {
            mode: 'cors',
            method: 'GET'
        })
        // .then(rawData => console.log(rawData))
        .then(rawData=> rawData.json())
        .then(data=>  data.body)
        .then(data => {
            writeRiegoauto(data, true)
        })
        .catch(err =>{ 
            console.log(err.message)
            writeRiegoauto(data, false)
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

//***** WRITE */
function writeData(temp, hum, lux) {
    pTemp.innerHTML = `Temperature: ${temp} °C`
    pHum.innerHTML = `Humidity: ${hum}%`
    pLi.innerHTML = `Light Intensity: ${lux.toFixed(2)} %`
}

function writeVentana(data, readed) {
    onOff = data === true ? 'Open': 'Close'

    if (readed) {
        pWind.innerHTML = `Window (${onOff})`
    } else {
        pWind.innerHTML = `Window`
    }
    

}

function writeRiegoauto(data, readed) {
    onOff = data === true ? 'On': 'Off'
    if (readed) {
        pAIrr.innerHTML = `Automate Irrigation (${onOff})`
    } else {
        pAIrr.innerHTML = `Automate Irrigation`
    }
    

}

//***** BTN */

function eventWind() {
    try {
        state = pWind.innerHTML.split('(')[1].split(')')[0] == 'Open' ? true: false;

        fetch(API_URL_VENTANA,
            {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "VENTANA": !state
                })
            })
            .then(rawData => rawData.json())
            .then(data => data.body)
            .then(data => {
                fetchVentana();
                newState = data === true? 'Opened' : 'Closed'
                alert(`Window ${newState} succesfully`, 'success')
            })
            .catch(err => {
                console.log(err.message)
                alert('Server connection error', 'error')
            })
    } catch (error) {
        alert('Server connection error', 'error')
    }
    
}

function eventIrr() {
    try {

        humidity = Number(pHum.innerHTML.split(' ')[1].split('%')[0])
        if (humidity >80) {
            alert("Humidity is high enough to irrgate", 'error')
        } else {
            fetch(API_URL_RIEGO,
                {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "RIEGO": true
                    })
                })
                .then(rawData => rawData.json())
                .then(data => data.body)
                .then(data => {
                    if (data = true) {
                        alert(`Irrigated!`, 'success')
                    } else {
                        alert("Couldn't irrgate", 'error')
                    }
                    
                })
                .catch(err => {
                    console.log(err.message)
                    alert('Server connection error', 'error')
                })
        }
        
    } catch (error) {
        alert('Server connection error', 'error')
    }
    
}

function eventAIrr() {
    try {
        state = pAIrr.innerHTML.split('(')[1].split(')')[0] == 'On' ? true: false;

        fetch(API_URL_RIEGOAUTO,
            {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "RIEGOAUTO": !state
                })
            })
            .then(rawData => rawData.json())
            .then(data => data.body)
            .then(data => {
                fetchRiegoauto();
                newState = data === true? 'Enabled' : 'Disabled'
                alert(`Automatic irrigation: ${newState}`, 'success')
            })
            .catch(err => {
                console.log(err.message)
                alert('Server connection error', 'error')
            })
    } catch (error) {
        alert('Server connection error', 'error')
    }
    
}

//*** Alerta */
function alert(text, icon){
    Swal.fire({
        title: text,
        icon: icon,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}

