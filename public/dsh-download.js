
// ********* Variables
var tBtn = document.getElementById("t-btn");
var hBtn = document.getElementById("h-btn");
var lBtn = document.getElementById("l-btn");


const API_URL_DATA = 'https://coplant.onrender.com/data'


// ***** Botones

tBtn.addEventListener('click', fetchData)
hBtn.addEventListener('click', fetchData)
lBtn.addEventListener('click', fetchData)

function ExportData(text, data)
{
    filename= `${text}.xlsx`;
    // data= [
    //     {H: 1, T: 2, L: 3},
    //     {H: 2, T: 3, L: 4},
    //     {H: 3, T: 4, L: 5}]
        
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, text);
    XLSX.writeFile(wb,filename);
}

 //ExportData();


function fetchData(event) {
    
    elem = event.currentTarget.id;
    textId = elem.split('-')[0];
    
    switch (textId) {
        case 't':
            text = 'Temperature'
            break;
        
        case 'h':
            text = 'Humidity'
            break;

        case 'li':
            text = 'LightIntensity'
            break;
    
        default:
            break;
    }
    
    console.log(text);

    fetch(API_URL_DATA,
        {
            mode: 'cors',
            method: 'GET'
        })
        // .then(rawData => console.log(rawData))
        .then(rawData=> rawData.json())
        .then(data=>  data.body)
        .then(data => {
            dataXLSX = dataGen(data);
            console.log(dataXLSX[1]);
            ExportData(text, dataXLSX);
        })
        .catch(err =>{ 
            console.log(err.message)
        })

}

//genero data para el csv
function dataGen(data) {
    humidity = Object.values(data.meanHumidity);
    luxP = Object.values(data.meanLuxP);
    temperature = Object.values(data.meanTemperature);

    dataXLSX = []
    for (let index = 0; index < humidity.length; index++) {
        register = {
            Temperature: humidity[index],
            Humidity: temperature[index],
            LightIntensity: luxP[index]
        }

        dataXLSX.push(register)
        
    }

    return dataXLSX
}