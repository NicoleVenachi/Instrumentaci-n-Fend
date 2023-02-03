
//************ Lecutra data */

const API_URL = 'https://coplant.onrender.com/data'

async function readData(event) {
    if (event) {
        console.log(event.matches);    
    }
    
    res = await fetch(API_URL,
        {
            mode: 'cors',
            method: 'GET'
        })

    data = await res.json()
    dataFull = data.body
    
    chartGen(dataFull, event);

}


function chartGen(dataFull,event) {
    
    y_temp = Object.values(dataFull.meanTemperature);
    samples = Array.from({length: y_temp.length}, (x, i) => i+1);
    x_temp = samples;

    y_hum = Object.values(dataFull.meanHumidity);
    x_hum = samples;

    y_li = Object.values(dataFull.meanLuxP);
    x_li = samples;

    //********Chart conf */
    // -- Text
    let tempText = 'Temperature (°C)'
    let humText = 'Humidity (%)'
    let liText = 'Light Intensity (%)'

    // --Options
    if (event) {
        if (event.matches) {
            var optionsTemp = optionsGen767(tempText)
            var optionsHum = optionsGen767(humText)
            var optionsLi = optionsGen767(liText)
        }
        else{
            var optionsTemp = optionsGen(tempText)
            var optionsHum = optionsGen(humText)
            var optionsLi = optionsGen(liText)
        }

    }
    else {
        if (screen_chart.matches) {
            var optionsTemp = optionsGen767(tempText)
            var optionsHum = optionsGen767(humText)
            var optionsLi = optionsGen767(liText)
        } else {
            var optionsTemp = optionsGen(tempText)
            var optionsHum = optionsGen(humText)
            var optionsLi = optionsGen(liText)
        }
        
    }

    // --Data
    var chartTemp = {
        labels: x_temp,
        datasets: [{
            label: 'Temperature',
            
            data: y_temp,

            pointStyle: 'circle',
            pointRadius: 2,
            pointBackgroundColor: 'rgba(49, 100, 244, 0.2)',
        
            fill: false,
            borderColor: 'rgba(49, 100, 244, 1)',
            color: "#F2F2F2",
            tension: 0.4  
        }]
    }; 
    var chartHum = {
        labels: x_hum,
        datasets: [{
            label: 'Humidity',
            
            data: y_hum,

            pointStyle: 'circle',
            pointRadius: 2,
            pointBackgroundColor: 'rgba(49, 100, 244, 0.2)',
        
            fill: false,
            borderColor: 'rgba(49, 100, 244, 1)',
            color: "#F2F2F2",
            tension: 0.4  
        }]
    }; 

    var chartLi = {
        labels: x_li,
        datasets: [{
            label: 'Light Intensity',
            
            data: y_li,

            pointStyle: 'circle',
            pointRadius: 2,
            pointBackgroundColor: 'rgba(49, 100, 244, 0.2)',
        
            fill: false,
            borderColor: 'rgba(49, 100, 244, 1)',
            color: "#F2F2F2",
            tension: 0.4  
        }]
    };

    //--Config

    var configTemp = {
        type: 'line',
        data: chartTemp,
        options: optionsTemp
    };

    var configHum = {
        type: 'line',
        data: chartHum,
        options: optionsHum
    };

    var configLi = {
        type: 'line',
        data: chartLi,
        options: optionsLi
    };


    // ********* RENDERIZAR CHART ********
    //limpio los chart
    if (myChart_temp || myChart_hum || myChart_li) {
        console.log('aaa');
        console.log(myChart_temp);
        myChart_temp.destroy()
        myChart_hum.destroy()
        myChart_li.destroy()
    }
    
    var ctx_temp = document.getElementById('chart-temp').getContext('2d');
    var myChart_temp = new Chart(ctx_temp, configTemp);


    var ctx_hum = document.getElementById('chart-hum').getContext('2d');
    var myChart_hum = new Chart(ctx_hum, configHum );

    var ctx_li = document.getElementById('chart-li').getContext('2d');
    var myChart_li = new Chart(ctx_li, configLi );
    

    chart_767(myChart_temp, ctx_temp, chartTemp, optionsTemp);
    chart_767(myChart_hum, ctx_hum, chartHum, optionsHum);
    chart_767(myChart_li, ctx_li, chartLi, optionsLi);
}

readData();

// ****** EVENTOS PARA ajsutarse a ventana


//su atributo matches estará en true o false
var screen_chart = window.matchMedia('screen and (max-width: 767px)')


// ******* Valido si tengo o no el btn ******
// listener por su cambiar el watchmedia (i.e., resize)
screen_chart.addListener(readData) 




//******FUnciones */
function chart_767(myChart,ctx, data, options) {
    
    var config = {
        type: 'line',
        data: data,
        
        options: options
    }; 
    myChart.destroy();
    var myChart = new Chart(ctx, config);
}

function optionsGen(text) {
    let options = {

        mantainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: text,
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 42);
        
                        return {
                            family: "Cursive",
                            weight: '400',
                            size: size
                        };
                    },
                }
            },
            
            

            x: {
                title: {
                    display: true,
                    text: 'Sample',
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 42);
        
                        return {
                            family: "Cursive",
                            weight: '400',
                            size: size
                        };
                    }
                },
                legend: {
                    color: "red"
                },

                grid: {
                    display: false
                },
                
    
                ticks: {
                    major: {
                        enabled: true
                    },
    
                    font: (context) => {
                        // console.log(context.tick && context.tick.major);
    
                        const boldedTicks = context.tick && context.tick.major ? 'bold' : '';
    
                        var width = context.chart.width;
                        var size = Math.round(width / 52);
    
                        return {
                            weight: boldedTicks,
                            size: size
                            
                        }
                    }
                }
    
                
                    
            },
    
        },
        plugins: {
            datalabels: {
                color: 'black',
            },
            legend: {
                labels: {
                    usePointStyle: true,
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 58);
        
                        return {
                            size: size
                        };
                    },
                    render: 'label',
                    fontColor: 'red'
                }
            },
            labels: {
                render: 'label',
                fontColor: "#fff",
            },
    
        },
    
        
    
    }
    return options
}

function optionsGen767(text) {
    let options = {

        mantainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: text,
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
        
                        return {
                            family: "Cursive",
                            weight: '400',
                            size: size
                        };
                    },
    
                },
                ticks: {
                    major: {
                        enabled: true
                    },
    
                    font: (context) => {
                        // console.log(context.tick && context.tick.major);
    
                        const boldedTicks = context.tick && context.tick.major ? 'bold' : '';
    
                        var width = context.chart.width;
                        var size = Math.round(width / 42);
    
                        return {
                            weight: boldedTicks,
                            size: size
                            
                        }
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Sample',
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
        
                        return {
                            family: "Cursive",
                            weight: '400',
                            size: size
                        };
                    }
                },
                legend: {
                    color: "red"
                },

                grid: {
                    display: false
                },
                
    
                ticks: {
                    major: {
                        enabled: true
                    },
    
                    font: (context) => {
                        // console.log(context.tick && context.tick.major);
    
                        const boldedTicks = context.tick && context.tick.major ? 'bold' : '';
    
                        var width = context.chart.width;
                        var size = Math.round(width / 42);
    
                        return {
                            weight: boldedTicks,
                            size: size
                            
                        }
                    }
                }
    
                
                    
            },
    
        },
        plugins: {
            datalabels: {
                color: 'black',
            },
            legend: {
                labels: {
                    usePointStyle: true,
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 42);
        
                        return {
                            size: size
                        };
                    },
                    render: 'label',
                    fontColor: 'red'
                }
            },
            labels: {
                render: 'label',
                fontColor: "#fff",
            },
    
        },
    }

    return options
}